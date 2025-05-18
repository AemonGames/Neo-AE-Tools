import { JSX } from 'solid-js';
import { A } from '@solidjs/router';
import { animate } from 'animejs';
import { useActiveToolConfig } from '../../utils/useToolConfig';

import appLogo from '../../resources/ae_tools_logo.png';

export default function Header(): JSX.Element {
  const { config } = useActiveToolConfig();
  let logoRef: HTMLImageElement | undefined;

  const triggerAnimation = () => {
    if (logoRef) {
      animate(logoRef, {
        translateX: [
          { value: 20, duration: 300, delay: 20 },
          { value: 0, duration: 400, delay: 20 },
        ],
        easing: 'easeInOutQuad',
        autoplay: true,
      });
    }
  };

  return (
    <header
      class="d-flex align-items-center p-3 text-white"
      style={{
        'background-color': config()?.color ?? '#333',
        transition: 'background-color 0.4s ease'
      }}
    >
      <A href="/" class="me-3" onMouseOver={triggerAnimation}>
        <img
          ref={logoRef}
          src={appLogo}
          alt="Tool Icon"
          height={60}
        />
      </A>
      <div>
        <h1 class="mb-0">{config()?.name ?? 'AE Tools'}</h1>
        <small>{config() ? `v${config()?.version}` : ' '}</small>
      </div>
    </header>
  );
}
