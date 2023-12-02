import googleButtonImage from "../assets/btn_google_signin.png";

type Props = {
  onClick: () => void;
};

const GoogleSignInButton = ({ onClick }: Props) => {
  return (
    <div>
      <button onClick={onClick}>
        <img src={googleButtonImage} alt="Google Login" width={200} />
      </button>
    </div>
  );
};

export default GoogleSignInButton;
