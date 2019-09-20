import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function HomePage() {
  return (
    <div className="container">
      <Container maxWidth="md">
        <Typography
          variant="h2"
          gutterBottom
          style={{
            marginTop: "60px",
            marginLeft: "28%",
            fontFamily: "Lucida Console"
          }}
        >
          Urban Move
        </Typography>
      </Container>
    </div>
  );
}
