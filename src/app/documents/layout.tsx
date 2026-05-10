interface DocumentLayoutProps {
  children: React.ReactNode;
}

const DocumentLayout = ({ children }: DocumentLayoutProps) => {
  return <div>{children}</div>;
};

export default DocumentLayout;
