import { showLoadingToast } from 'vant';

let currentLoading: any= null;

export function showLoading(message = '加载中...', forbidClick = true) {
  // 如果已经有 loading，先关闭
  if (currentLoading) {
    currentLoading.close();
  }

  currentLoading = showLoadingToast({
  message: 'Loading...',
  forbidClick: true,
  loadingType: 'spinner',
  duration:0
});

  return {
    close: () => {
      currentLoading.close();
    },
  };
}

export function hideLoading() {
   currentLoading.close()
}
