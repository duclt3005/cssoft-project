interface IPermission {
  [k: string] : {
    [k: string] : {
      [k: string] : string | object,
    }
  };
}

export const PERMISSION: IPermission = {
  system: {
    level: {
      title: "Cấp độ",
      url: "/system/level",
      icon: "fas fa-layer-group",
      menu: {
        teacher: {
          title: "Giáo viên",
          url: "/system/level/teacher",
          icon: "",
          menu: {},
        },
        student: {
          title: "Học sinh",
          url: "/system/level/student",
          icon: "",
          menu: {},
        },
        noLevel: {
          title: "Không có cấp độ",
          url: "/system/level/no-level",
          icon: "",
          menu: {},
        },
      },
    },
    account: {
      title: "Tài khoản",
      url: "/system/account",
      icon: "fas fa-layer-group",
      teacher: {
        title: "Giáo viên",
        url: "/system/account/teacher",
        icon: "",
        menu: {},
      },
      student: {
        title: "Học sinh",
        url: "/system/account/student",
        icon: "",
        menu: {},
      },
    },
  },
  teacher: {
    account: {
      title: "Tài khoản",
      url: "/teacher/account",
      icon: "",
      menu: {},
    },
  },
  student: {
    account: {
      title: "Tài khoản",
      url: "/student/account",
      icon: "",
      menu: {},
    },
  },
};
