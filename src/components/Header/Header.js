import MetaHeader from "../MetaHeader";
import NavigationBar from "../NavigationBar";

function Header({ social, ...delegated }) {
  return (
    <>
      <MetaHeader {...delegated} />
      <NavigationBar social={social} />
    </>
  );
}

export default Header;
