
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Share } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0077B5] hover:bg-[#0077B5]/90",
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        description: "Link copied to clipboard!",
      });
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-2">
        <Share className="h-4 w-4" />
        <span className="font-semibold">Share this article</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="sm"
            onClick={() => window.open(link.url, "_blank")}
            className="transition-colors"
          >
            {link.name}
          </Button>
        ))}
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          Copy Link
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;
