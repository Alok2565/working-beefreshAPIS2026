import { setPasswordTemplate } from "../../email-templates/setPasswordTemplate";

export default function EmailPreview() {
  const html = setPasswordTemplate("John Doe", "sample-token-123");

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
