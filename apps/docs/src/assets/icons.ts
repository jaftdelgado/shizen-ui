import iconoirSet from "@iconify-json/iconoir/icons.json";

type IconoirKey = keyof typeof iconoirSet.icons;

function getIcon(name: IconoirKey) {
  const { body } = iconoirSet.icons[name];
  return {
    body: body.replaceAll('stroke-width="1.5"', 'stroke-width="2.3"'),
    width: iconoirSet.width,
    height: iconoirSet.height
  };
}

export type IconoirIcon = ReturnType<typeof getIcon>;

export const Basketball = getIcon("basketball");
export const Bicycle = getIcon("bicycle");
export const Golf = getIcon("golf");
export const Tv = getIcon("tv");
export const Camera = getIcon("camera");
export const CloudUpload = getIcon("cloud-upload");
export const CloudCheck = getIcon("cloud-check");

export const Facebook = getIcon("facebook");
export const Instagram = getIcon("instagram");
export const Snapchat = getIcon("snapchat");
export const Threads = getIcon("threads");
export const TikTok = getIcon("tiktok");

export const BadgeCheck = getIcon("badge-check");
export const MapPin = getIcon("map-pin");
export const StatDownIcon = getIcon("stat-down");
export const StatUpIcon = getIcon("stat-up");

export const AlignCenter = getIcon("align-center");
export const AlignLeft = getIcon("align-left");
export const AlignRight = getIcon("align-right");
export const Bold = getIcon("bold");
export const Italic = getIcon("italic");
export const Underline = getIcon("underline");
export const Bookmark = getIcon("bookmark");
export const BookmarkSolid = getIcon("bookmark-solid");
export const UserPlus = getIcon("user-plus");

export const ZoomIn = getIcon("zoom-in");
export const ZoomOut = getIcon("zoom-out");
export const CreditCard = getIcon("credit-card");
export const MessageText = getIcon("message-text");
export const Repository = getIcon("repository");
export const GitPullRequest = getIcon("git-pull-request");
export const NavArrowUp = getIcon("nav-arrow-up");
export const NavArrowDown = getIcon("nav-arrow-down");
export const Plus = getIcon("plus");
export const Minus = getIcon("minus");
export const Code = getIcon("code");
export const Xmark = getIcon("xmark");

export const Terminal = getIcon("terminal");
export const Palette = getIcon("palette");
export const Accessibility = getIcon("accessibility");
export const CodeBrackets = getIcon("code-brackets");

export const Bell = getIcon("bell");
export const EyeEmpty = getIcon("eye-empty");
export const ProfileCircle = getIcon("profile-circle");
export const WarningTriangle = getIcon("warning-triangle");
