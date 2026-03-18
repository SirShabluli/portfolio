import PageNav from "../components/PageNav";

export default function PagmarLayout({ children }) {
  return (
    <>
      {children}
      <PageNav />
    </>
  );
}
