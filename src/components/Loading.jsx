import "../styles/loading.css";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <div className="loading">
    <ReactLoading type={type} color={color} height={"10%"} width={"30%"} />
  </div>
);

export default Loading;
