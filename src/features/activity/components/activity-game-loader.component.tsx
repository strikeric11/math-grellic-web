import { memo, useMemo } from 'react';
import cx from 'classix';

import type { ComponentProps } from 'react';
import { ActivityGame, type Activity } from '../models/activity.model';

type Props = ComponentProps<'div'> & {
  activity: Activity;
  preview?: boolean;
};

const gameSrc = {
  [ActivityGame.AngryBirds as string]: '/games/angry-birds/index.html',
  [ActivityGame.Basketball as string]: '/games/basketball/index.html',
  [ActivityGame.CarRacing as string]: '/games/car-racing/index.html',
  [ActivityGame.EscapeRoom as string]: '/games/escape-room/index.html',
  [ActivityGame.SlidePuzzle as string]: '/games/slide-puzzle/index.html',
};

export const ActivityGameLoader = memo(function ({
  className,
  activity,
  preview,
  ...moreProps
}: Props) {

  console.log("ActivityGameLoader preview: ", preview);

  const gameName = useMemo(() => activity.game.name, [activity]);

  //Test detect os 02/09/2025

  const getOS = () => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.includes("Windows")) return "windows";
    if (userAgent.includes("Mac")) return "mac";
    if (userAgent.includes("Linux")) return "linux";
    if (userAgent.includes("Android")) return "android";
    if (/iPad|iPhone|iPod/.test(userAgent)) return "ios";
    return "unknown";
  };

  /////////


  const gameUrl = useMemo(() => {
    console.log("getOS: ", getOS);
    if (!gameName) return null;
    const baseUrl = gameSrc[gameName];
    const params = new URLSearchParams({
      gameSlug: activity.slug,
      preview: preview ? "true" : "false", // Include preview as a query parameter
    });
    return `${baseUrl}?${params.toString()}`;
  }, [gameName, activity.slug, preview]);

  return (
    <div
      className={cx(
        'w-full max-w-static-full overflow-hidden rounded-lg',
        className,
      )}
      {...moreProps}
    >
      {gameUrl && (
        <iframe className="aspect-video w-full" src={gameUrl} />
      )}
    </div>
  );
});
