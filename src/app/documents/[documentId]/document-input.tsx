import { BsCloudCheck } from 'react-icons/bs';

const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg  cursor-pointer truncate">Untitled Document</span>
      <BsCloudCheck />
    </div>
  );
};

export default DocumentInput;
