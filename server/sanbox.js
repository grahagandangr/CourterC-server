function diff_hours(dt2, dt1) {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

dt1 = new Date();
dt2 = new Date("2022-09-13T14:16:23.396Z");
console.log(diff_hours(dt1, dt2));


