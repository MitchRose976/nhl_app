import { Breakpoint, Container } from "@mui/material";

interface FeatureContainerProps {
  showComponent: boolean;
  maxWidth?: Breakpoint;
  children: JSX.Element;
}

const FeatureContainer = ({
  showComponent,
  maxWidth,
  children,
}: FeatureContainerProps) => {
  return (
    <Container
      maxWidth={maxWidth || false}
      sx={{
        opacity: showComponent ? 1 : 0,
        transition: "opacity 0.5s ease-in",
        padding: "2rem 1rem 2rem 1rem",
      }}
      className={showComponent ? "fade-in " : ""}
    >
      {children}
    </Container>
  );
};

export default FeatureContainer;
