import Button from "../../Button";

function Optionlist({ data, onClick }) {
  // const classes = cx({ separate: data.separate });

  return (
    <Button
      separate={data.separate}
      textStyle
      leftIcon={data.icon}
      to={data.to}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}

export default Optionlist;
