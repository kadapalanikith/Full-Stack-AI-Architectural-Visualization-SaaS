import { Box, Menu, X } from "lucide-react";
import { useOutletContext } from "react-router";
import { useState } from "react";

const Navbar = () => {
    const { isSignedIn, userName, signIn, signOut } = useOutletContext<AuthContext>();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleAuthClick = async () => {
        if (isSignedIn) {
            try { await signOut(); } catch (e) { console.error(`Puter sign out failed: ${e}`); }
            return;
        }
        try { await signIn(); } catch (e) { console.error(`Puter sign in failed: ${e}`); }
    };

    const closeMobile = () => setMobileOpen(false);

    return (
        <>
            <header className="navbar">
                <nav className="inner">
                    <div className="left">
                        <a href="/" className="brand" aria-label="Roomify Home">
                            <Box className="logo" />
                            <span className="name">Roomify</span>
                        </a>

                        <ul className="links" role="list">
                            <li><a href="#features">Features</a></li>
                            <li><a href="#how-it-works">How it Works</a></li>
                            <li><a href="#projects">Projects</a></li>
                        </ul>
                    </div>

                    <div className="right">
                        {isSignedIn ? (
                            <>
                                <span className="greeting">
                                    {userName ? `Hi, ${userName}` : "Signed in"}
                                </span>
                                <button className="login-btn" onClick={handleAuthClick} aria-label="Sign out">
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="login-btn" onClick={handleAuthClick} aria-label="Sign in">
                                    Log In
                                </button>
                                <a href="#upload" className="cta-btn" aria-label="Get started">
                                    Get Started
                                </a>
                            </>
                        )}

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileOpen((v) => !v)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile navigation dropdown */}
            <div className={`mobile-nav${mobileOpen ? " open" : ""}`} role="navigation" aria-label="Mobile navigation">
                <a href="#features" onClick={closeMobile}>Features</a>
                <a href="#how-it-works" onClick={closeMobile}>How it Works</a>
                <a href="#projects" onClick={closeMobile}>Projects</a>
                <a href="#upload" onClick={closeMobile} style={{ color: "#f97316", fontWeight: 700 }}>
                    Get Started →
                </a>
            </div>
        </>
    );
};

export default Navbar;