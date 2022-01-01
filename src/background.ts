chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'menuItem1',
    title: '这个是一个菜单',
    contexts: ['selection'],
  });
  chrome.contextMenus.create({
    id: 'menuItem2',
    title: '这个是一个菜单2',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab)=>{
  if( info.menuItemId === 'menuItem1' ){
    console.log(info.menuItemId)
  }
  if( info.menuItemId === 'menuItem2' ){
    console.log(info.menuItemId)
  }
});
