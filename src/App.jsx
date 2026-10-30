import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Promo from "./components/Promo";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return undefined;

    if (!("IntersectionObserver" in window)) {
      root.querySelectorAll("[data-reveal]").forEach((target) => {
        target.classList.add("is-visible");
      });
      return undefined;
    }

    const targets = new WeakSet();
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const observeTargets = (node) => {
      if (!(node instanceof Element)) return;

      if (node.matches("[data-reveal]") && !targets.has(node)) {
        targets.add(node);
        revealObserver.observe(node);
      }

      node.querySelectorAll("[data-reveal]").forEach((target) => {
        if (targets.has(target)) return;
        targets.add(target);
        revealObserver.observe(target);
      });
    };

    observeTargets(root);

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach(observeTargets);
      });
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="home">
        <Hero />
        <About />
        <Menu />
        <Promo />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
