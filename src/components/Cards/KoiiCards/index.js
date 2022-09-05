
export function KoiiCard(props) {
  let { content } = props;
  let cardDescriptionLength = content.description.length;
  if (cardDescriptionLength > 140){content.description = (content.description.slice(0, 140) + ' ...')}
  
  return (
    <div className="card">
            <img onError={(e) => {
                e.target.src = 'https://pbs.twimg.com/profile_images/1424786684194041859/lkDa9l1U_400x400.png'}} 
                src={`https://koii.live/${content.id}.png`}
                objectFit="cover"
                alt={content.videoTitle}/>
            <h3 className="cardTitle">{content.videoTitle}</h3>
            <p className="cardText">{content.description}</p>
          </div>
        )
      }
     


export default KoiiCard;