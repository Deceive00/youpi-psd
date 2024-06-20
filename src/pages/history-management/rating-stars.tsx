interface Props {
    name : string;
}

const RatingStars : React.FC<Props> = ({name}) => {
    return(
        <div className="rating rating-lg">
            <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" />
            <input type="radio" name={name} className="mask mask-star-2 bg-orange-400"/>
            <input type="radio" name={name} className="mask mask-star-2 bg-orange-400"/>
            <input type="radio" name={name} className="mask mask-star-2 bg-orange-400"/>
        </div>
    )
}

export default RatingStars 