interface DocuemntLayoutProps {
  children: React.ReactNode;
}

const DocuemntLayout = ({ children }: DocuemntLayoutProps) => {
  return <div>{children}</div>;
};

export default DocuemntLayout;
