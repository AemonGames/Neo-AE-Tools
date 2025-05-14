import { JSX, VoidProps } from "solid-js";
import { A } from "@solidjs/router";
import { Button } from "solid-bootstrap";
import "./PresentationSchemes.scss";

export function PresentationButton(
    props: VoidProps<{ img_src: string; label: string; click_func: () => void; hintText: string; animate?: boolean }>
  ): JSX.Element {
    return (
      <Button
        variant="light"
        class={`present-button d-flex flex-column align-items-center ${props.animate ? "animated" : ""}`}
        onClick={props.click_func}
        title={props.hintText}
      >
        <img src={props.img_src || "/assets/icons/default.svg"} alt={`${props.label} icon`} />
        <h2 class="mt-2">{props.label}</h2>
      </Button>
    );
  }
  
  export function PresentationLink(
    props: VoidProps<{
      img_src: string;
      label: string;
      href: string;
      isNavLink?: boolean;
      animate?: boolean;
      delay?: number; // in milliseconds
    }>
  ): JSX.Element {
    const style = props.animate
      ? {
          "animation-delay": `${props.delay || 0}ms`,
        }
      : undefined;
  
    return (
      <A href={props.href} class="text-decoration-none">
        <Button
          variant="light"
          style={style}
          class={`present-button d-flex flex-column align-items-center ${props.isNavLink ? "present-nav-button" : ""} ${props.animate ? "animated" : ""}`}
        >
          <img src={props.img_src || "/assets/icons/default.svg"} alt={`${props.label} icon`} />
          <h2 class="mt-2">{props.label}</h2>
        </Button>
      </A>
    );
  }
  
  