import iconoirSet from "@iconify-json/iconoir/icons.json";

type IconoirKey = keyof typeof iconoirSet.icons;

function getIcon(name: IconoirKey) {
  const { body } = iconoirSet.icons[name];
  return {
    body: body.replaceAll('stroke-width="1.5"', 'stroke-width="2.2"'),
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
