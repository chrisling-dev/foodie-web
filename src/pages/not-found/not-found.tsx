import useNavigate from "../../hooks/useNavigate";

const NotFound = () => {
  const { toHome } = useNavigate();
  return (
    <div className=" w-full pt-80 flex items-center justify-center text-center flex-col">
      <p>Nothing's here!</p>
      <span className="link underline mt-3" onClick={toHome}>
        Back to Home &rarr;
      </span>
    </div>
  );
};

export default NotFound;
