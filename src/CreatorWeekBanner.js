export default function CreatorWeekBanner() {
  return (
    <div className="bannerContainer">
      <span
        style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "medium" }}
      >
        🌟
      </span>
      <span style={{ marginBottom: "12px" }}>
        <div style={{ display: "inline" }}>
          It's <strong>Cladder Creator Week</strong>! Each puzzle this week has
          been submitted by one of our favorite creators!
        </div>
      </span>
      <span>
        <div style={{ display: "inline" }}>
          Watch them play each other's puzzles on TikTok by searching for{" "}
          <strong>#CladderCreatorWeek</strong>!
        </div>
      </span>
    </div>
  );
}
