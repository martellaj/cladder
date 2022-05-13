import { Loader } from "semantic-ui-react";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Loader active inline size="big" />
    </div>
  );
}
