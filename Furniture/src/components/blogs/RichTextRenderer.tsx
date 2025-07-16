import Dompurify from "dompurify";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

function RichTextRenderer({ content, className }: Props) {
  const sanitizeContent = Dompurify.sanitize(content);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizeContent }}
      className={className}
    ></div>
  );
}

export default RichTextRenderer;
