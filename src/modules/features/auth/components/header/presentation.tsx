import { User } from "@/utils/types/models";
import Link from "next/link";
import { HeaderMenuItem } from "./headerMenuItem";
import { flags } from "@/config/featureFlags";

const UnauthenticatedMenus = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <HeaderMenuItem href="/" segment={null}>
          Home
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/login" segment="login">
          Sign in
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/register" segment="register">
          Sign up
        </HeaderMenuItem>
      </li>
    </ul>
  );
};

const UnauthenticatedMenusNew = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <HeaderMenuItem href="/" segment={null}>
          Home
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/?tab=global" segment={null}>
          Explore
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/register" segment="register">
          Sign up
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/register" segment="register">
          <span className="btn btn-sm btn-outline-primary">Get Started</span>
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/login" segment="login">
          Sign in
        </HeaderMenuItem>
      </li>
    </ul>
  );
};

const AuthenticatedMenus = ({ authUser }: { authUser: User }) => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <HeaderMenuItem href="/" segment={null}>
          Home
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/editor" segment="editor">
          <i className="ion-compose"></i>&nbsp;New Article
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/settings" segment="settings">
          <i className="ion-gear-a"></i>&nbsp;Settings
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href={`/profile/${authUser.username}`} segment="profile">
          {authUser.image && <img src={authUser.image} alt="" className="user-pic" />}
          {authUser.username}
        </HeaderMenuItem>
      </li>
    </ul>
  );
};

const AuthenticatedMenusNew = ({ authUser }: { authUser: User }) => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <HeaderMenuItem href="/" segment={null}>
          Home
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/?tab=global" segment={null}>
          Explore
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/editor" segment="editor">
          <i className="ion-compose"></i>&nbsp;New Article
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/settings" segment="settings">
          <i className="ion-gear-a"></i>&nbsp;Settings
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href={`/profile/${authUser.username}`} segment="profile">
          {authUser.image && <img src={authUser.image} alt="" className="user-pic" />}
          {authUser.username}
        </HeaderMenuItem>
      </li>
      <li className="nav-item">
        <HeaderMenuItem href="/editor" segment="editor">
          <span className="btn btn-sm btn-outline-success">Share Update</span>
        </HeaderMenuItem>
      </li>
    </ul>
  );
};

export const Header = ({ authUser }: { authUser?: User }) => {
  const brand = flags.ENABLE_NEW_NAVBAR ? (
    <Link className="navbar-brand" href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
      conduit
      <span className="badge badge-pill badge-primary">New</span>
    </Link>
  ) : (
    <Link className="navbar-brand" href="/">
      conduit
    </Link>
  );

  return (
    <header>
      <nav
        className="navbar navbar-light"
        style={
          flags.ENABLE_NEW_NAVBAR
            ? {
                background: "linear-gradient(90deg, rgba(167,0,0,0.14), rgba(167,0,0,0.04))",
                borderBottom: "2px solid rgb(167, 0, 0)",
              }
            : undefined
        }
      >
        <div className="container" style={flags.ENABLE_NEW_NAVBAR ? { alignItems: "center" } : undefined}>
          {brand}
          {authUser ? (
            flags.ENABLE_NEW_NAVBAR ? (
              <AuthenticatedMenusNew authUser={authUser} />
            ) : (
              <AuthenticatedMenus authUser={authUser} />
            )
          ) : flags.ENABLE_NEW_NAVBAR ? (
            <UnauthenticatedMenusNew />
          ) : (
            <UnauthenticatedMenus />
          )}
        </div>
      </nav>
    </header>
  );
};
