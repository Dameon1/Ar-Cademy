export function KoiiCard(props) {
  let { content } = props;
  let cardDescriptionLength = content.description.length;
  if (cardDescriptionLength > 140) {
    content.description = content.description.slice(0, 140) + " ...";
  }

  return (
    <div className="card">
      <img
        src={`https://koii.live/${content.id}.png`}
        onError={(e) => {
          e.target.src =
            "https://pbs.twimg.com/profile_images/1578815653615734785/Dc6rUG0m_400x400.jpg";
        }}
        objectfit="contain"
        alt={content.videoTitle}
      />
      <h3 className="cardTitle">{content.videoTitle}</h3>
      <p className="cardText">{content.description}</p>
      <a
        href={`https://koi.rocks/content-detail/${content.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="textNoDec"
      >
        View on Koii
      </a>
    </div>
  );
}

export default KoiiCard;
