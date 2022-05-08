export default function CreatorWeekResultsBanner(props) {
  const { puzzleNumber } = props;

  if (puzzleNumber < 48 || puzzleNumber > 53) {
    return null;
  }

  return (
    <div className="bannerContainer bannerResultsContainer">
      <span
        style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "medium" }}
      >
        🌟
      </span>
      <span
        style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "medium" }}
      >
        CLADDER CREATOR WEEK
      </span>
      <span style={{ marginBottom: "12px" }}>
        <div style={{ display: "inline" }}>
          Today's puzzle has been submitted by{" "}
          <a
            href={getCreatorTikTokLink(puzzleNumber, true)}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{getCreatorName(puzzleNumber, true)}</strong>
          </a>
          ! Check them out on TikTok for Cladder, Wordle, and more!
        </div>
      </span>
      <span>
        <div style={{ display: "inline" }}>
          Make sure to follow{" "}
          <a
            href={getCreatorTikTokLink(puzzleNumber, false)}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{getCreatorName(puzzleNumber, false)}</strong>
          </a>{" "}
          who will be attempting to solve this puzzle on TikTok today!
        </div>
      </span>
    </div>
  );
}

function getCreatorName(puzzleNumber, isSubmitter) {
  console.log(puzzleNumber);
  if (puzzleNumber === 48) {
    return isSubmitter ? "@kennyhaller" : "@dailywordle";
  } else if (puzzleNumber === 49) {
    return isSubmitter ? "@dailywordle" : "@kennyhaller";
  }
}

function getCreatorTikTokLink(puzzleNumber, isSubmitter) {
  if (puzzleNumber === 48) {
    return isSubmitter
      ? "https://tiktok.com/@kennyhaller"
      : "https://www.tiktok.com/@dailywordle";
  } else if (puzzleNumber === 49) {
    return isSubmitter
      ? "https://www.tiktok.com/@dailywordle"
      : "https://tiktok.com/@kennyhaller";
  }
}
