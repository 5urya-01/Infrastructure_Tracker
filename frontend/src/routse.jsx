import { lazy } from 'react';

const SamplePage = lazy(() => import("./views/others/samplePage"));
const IndepthPage = lazy(() => import("./InDepthView/BuildingView"));
const FloorPage = lazy(() => import("./InDepthView/FloorView"));
const RoomPage = lazy(() => import("./InDepthView/RoomView"));
const AssestPage = lazy(() => import("./InDepthView/AssetView"));
const LowerAssetPage = lazy(()=> import("./InDepthView/UpperAssetView"));
const ItemWise = lazy(() => import("./DashBoard/Main/ItemWise"));
const Placewise = lazy(() => import("./DashBoard/Main/PlaceWise"));
const AddAsset = lazy(() => import("./UniversalAddAsset/AddAsset"));
const RPW = lazy(() => import("./DashBoard/Room/roomPlaceWise"));
const FPW = lazy(() => import("./DashBoard/Floor/floorPlaceWise"));
const BPW = lazy(() => import("./DashBoard/Building/buldPlaceWise"));
const IB = lazy(()=> import("./DashBoard/itemdashboard"));
const storeroom = lazy(() => import("./Storeroom/storeroom"))
// const Building = lazy(() => import("./Dynamic Cards/asset"));
// const Floor = lazy(() => import("./Dynamic Cards/Floor"));
// const Room = lazy(() => import("./Dynamic Cards/Room"));

const RouteList = [
  { 
    exact: true, 
    path: "/indepthpage/itemwise/:item", 
    name: "AddPage", 
    component: IB, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/itemwise/:item", 
    name: "AddPage", 
    component: IB, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId/itemwise/:item", 
    name: "AddPage", 
    component: IB, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId/:roomId/itemwise/:item", 
    name: "AddPage", 
    component: IB, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/addAsset", 
    name: "AddPage", 
    component: AddAsset, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/itemwise", 
    name: "globalItemwise", 
    component: ItemWise, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/placewise", 
    name: "globalPlaceWise", 
    component: Placewise, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/placewise", 
    name: "buildingPlacewise", 
    component: BPW, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/itemwise", 
    name: "BuildingItemwise", 
    component: ItemWise, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId/itemwise", 
    name: "floorItemwise", 
    component: ItemWise, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId/:roomId/itemwise", 
    name: "roomItemwise", 
    component: ItemWise, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId/placewise", 
    name: "floorPlacWise", 
    component: FPW, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId/:roomId/placewise", 
    name: "roomPlacWise", 
    component: RPW, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId", 
    name: "Indepth Page", 
    component: RoomPage, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId", 
    name: "Indepth Page", 
    component: FloorPage, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage", 
    name: "Indepth Page", 
    component: IndepthPage, 
    role: 'admin'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId/:roomId", 
    name: "Asset View", 
    component: AssestPage, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/indepthpage/:buildingId/:floorId/:roomId/:itemId", 
    name: "Asset View", 
    component: LowerAssetPage, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/page/sample-page", 
    name: "Sample Page", 
    component: SamplePage, 
    role: 'user'
  },
  { 
    exact: true, 
    path: "/storeroom", 
    name: "Store Room", 
    component: storeroom, 
    role: 'user'
  },
];

export default RouteList;
