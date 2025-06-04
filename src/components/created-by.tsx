import { type ReactElement } from 'react';

export function CreatedBy({ logo }: { logo: ReactElement }) {
  return (
    <div className="mb-8 flex w-full items-center justify-center rounded-lg border bg-slate-700">
      <div className="bg-TPSAbout-bg w-40 rounded-lg p-4 text-center">
        <p className="text-slate-200">Created by</p>
        <div className="flex justify-center">{logo}</div>
        <div className="grid">
          <a className="hover:text-ring text-slate-200" href="https://www.louisrossouw.com/" target="_blank">
            www.louisrossouw.com
          </a>
          {/* <a className="text-TPSAbout-txt hover:text-ring" href="https://www.timeinprogress.com/" target="_blank">
            www.timeinprogress.com
          </a> */}
        </div>
        {/* <AppVersion /> */}
      </div>
    </div>
  );
}
