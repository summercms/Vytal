import './GitHub.css';
import { ReactComponent as GithubImg } from '../images/github.svg';

const Github = () => (
  <>
    <div className="gitHubButton">
      <a
        className="githubBtn"
        href="https://github.com/z0ccc/Vytal"
        aria-label="Star z0ccc/Vytal on GitHub"
      >
        <GithubImg className="githubImg" />
        GitHub
      </a>
    </div>
  </>
);

export default Github;
