import type { StrapiApp } from '@strapi/strapi/admin';
import './overrides.css'

export default {
  config: {
    tutorials: false,
    notifications: { releases: false },

    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  register(app: StrapiApp) {
    const indexRoute = app.router.routes.find(({index}) => index);
    if (!indexRoute){
      throw new Error("Unable to find index page");
    }
    indexRoute.lazy = async () => {
      const {CustomDashboard} = await import(
          './CustomDashboard'
          );
      return {Component: CustomDashboard}
    }
  },
  // This does not print but it may get called.
  bootstrap(app: StrapiApp) {
    console.error('bootstrapping in src/admin/app.tsx',app.store);

    console.error(app.store?.getState())

    const iconsToHide = ["/admin/plugins/cloud", "/admin/settings", "/admin/content-manager"];
    /**
     * When run, tries to hide the icon for anchor with the given href. Returns true if successful. False otherwise
     * @param targetHref
     */
    const tryHideIcon = (targetHref: string) => {
      const anchor = document.querySelector(`a[href="${targetHref}"]`);
      if (anchor){
        const listItem: HTMLElement | null = anchor.closest('li');
        if (listItem){
          listItem.style.display = 'none';
          return true;
        }
      }
      return false;
    }

    // for (const href of iconsToHide){
    //   if (!tryHideIcon(href)){
    //     const observer = new MutationObserver(() => {
    //       if (tryHideIcon(href)){
    //         observer.disconnect();
    //       }
    //     })
    //     observer.observe(document.body, {childList:true, subtree:true});
    //     setTimeout(() => observer.disconnect(), 10_000);
    //   }
    // }
  },
};
