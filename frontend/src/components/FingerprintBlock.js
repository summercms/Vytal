import md5 from 'crypto-js/md5';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScanBlock from './ScanBlock';
import Table from './Table';

const FingerprintBlock = () => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');

  useEffect(() => {
    axios.get(`/api/fingerprint/?hash=${hash}`).then((response) => {
      if (response.data.length !== 0) {
        setName(response.data[response.data.length - 1].name);
      }
    });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    axios.post('/api/fingerprint/', {
      name: e.target[0].value,
      hash,
    });
    setSaved(true);
  };

  const gl = document.createElement('canvas').getContext('webgl');
  const ext = gl.getExtension('WEBGL_debug_renderer_info');

  const fingerprintData = [
    {
      key: 'screenResolution',
      value: `${window.screen.width}x${window.screen.height}`,
    },
    {
      key: 'colorResolution',
      value: window.screen.colorDepth,
    },
    {
      key: 'deviceMemory',
      value: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'N/A',
    },
    {
      key: 'cpuCores',
      value: navigator.hardwareConcurrency || 'N/A',
    },
    {
      key: 'maxTouchpoints',
      value: navigator.maxTouchPoints,
    },
    {
      key: 'webGLVendor',
      title: 'WebGL vendor',
      value: gl.getParameter(ext.UNMASKED_VENDOR_WEBGL),
    },
    {
      key: 'webglRenderer',
      title: 'WebGL renderer',
      value: gl.getParameter(ext.UNMASKED_RENDERER_WEBGL),
    },
    {
      key: 'platform',
      value: navigator.platform,
    },
    {
      key: 'userAgent',
      value: navigator.userAgent,
    },
    {
      key: 'preferredLanguage',
      value: navigator.language,
    },
    {
      key: 'languages',
      title: 'Languages',
      value: navigator.languages,
    },
    {
      key: 'timezone',
      value: Intl.DateTimeFormat().resolvedOptions().timeZone || 'N/A',
    },
    {
      key: 'cookiesEnabled',
      value: navigator.cookieEnabled,
    },
    {
      key: 'javaEnabled',
      value: navigator.javaEnabled(),
    },
    {
      key: 'dntHeader',
      value: navigator.doNotTrack,
    },
    {
      key: 'automatedBrowser',
      value: navigator.webdriver,
    },
    {
      key: 'plugins',
      value: navigator.plugins,
    },
  ];

  const hash = md5(JSON.stringify(fingerprintData)).toString();

  const tableData = [
    {
      key: 'hash',
      title: 'Hash',
      value: hash,
    },
    {
      key: 'name',
      title: 'Name',
      value: name,
    },
  ];

  return (
    <ScanBlock>
      <h1>Fingerprint</h1>
      {name ? (
        <Table data={tableData} />
      ) : (
        <div className="boxWrap">
          <div className="hash">{hash}</div>
        </div>
      )}
      <p>
        <b>Explanation:</b> JavaScript can be used to read various information
        about your software. This information can be used to create a
        fingerprint.
      </p>
      {saved ? (
        <p>Success! Re-scan browser.</p>
      ) : (
        <form
          onSubmit={(e) => {
            handleSave(e);
          }}
        >
          <input type="text" id="name" name="name" placeholder="Enter name" />
          <input type="submit" id="saveButton" value="Save" maxLength="100" />
        </form>
      )}
    </ScanBlock>
  );
};

export default FingerprintBlock;