// inspect-clerk.js
const main = async () => {
  const clerk = await import('@clerk/vue');
  console.log(Object.keys(clerk));
};

main();

