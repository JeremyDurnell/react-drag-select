import { NextComponentType, NextPageContext } from "next";

const Index: NextComponentType = () => {
  return <a href="drag-select-test">drag-select-test</a>;
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  ctx!.res!.writeHead(302, { location: "drag-select-test" });
  ctx.res!.end();
};

export default Index;
