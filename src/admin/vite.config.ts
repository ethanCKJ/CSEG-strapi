import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    server: {
      allowedHosts: ['s2312606vm.inf.ed.ac.uk','groups.inf.ed.ac.uk']
    }
  });
};
