import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ value }: { value: number }) => {
  return (
    <div className="d-flex align-items-center">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= value ? (
          <FaStar key={star} color="#FBB03B" />
        ) : (
          <FaRegStar key={star} color="#ccc" />
        )
      )}
    </div>
  );
};

export default Rating;