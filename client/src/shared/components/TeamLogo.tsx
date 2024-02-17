interface TeamLogoProps {
  svgString: string;
  width: number;
  height: number;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ svgString, width, height }) => {
  return (
    <svg width={width} height={height}>
      <image href={`${svgString}`} width={width} height={height} />
    </svg>
  );
};

export default TeamLogo;
