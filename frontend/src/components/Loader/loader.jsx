import "./Loader.css";
import LoadLottie from "../../assets/lotties/loading.json";
import Lottie from "lottie-react";
function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <Lottie animationData={LoadLottie} />
      </div>
    </div>
  );
}

export default Loader;
