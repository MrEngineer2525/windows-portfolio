import React, { useMemo, useRef, useState } from "react";
import Draggable from "react-draggable";
import {
  MdMinimize,
  MdCheckBoxOutlineBlank,
  MdClose,
  MdAdd,
  MdArrowBack,
  MdArrowForward,
  MdArrowUpward,
  MdRefresh,
  MdHome,
  MdNavigateNext,
  MdSearch,
  MdExpandMore,
  MdChevronRight,
  MdPushPin,
} from "react-icons/md";

const MOCK_ITEMS = [
  {
    id: 1,
    name: "portfolio-v1.zip",
    originalLocation: "C:\\Users\\Claytone\\Documents\\Projects",
    deletedOn: "Today, 10:32 AM",
    size: "24.6 MB",
    type: "Compressed (ZIP) Folder",
  },
  {
    id: 2,
    name: "screenshot-2026-01-27.png",
    originalLocation: "C:\\Users\\Claytone\\Pictures\\Screenshots",
    deletedOn: "Yesterday, 8:14 PM",
    size: "3.1 MB",
    type: "PNG File",
  },
  {
    id: 3,
    name: "random-ideas.md",
    originalLocation: "C:\\Users\\Claytone\\Documents\\Notes",
    deletedOn: "Jan 20, 2026",
    size: "18 KB",
    type: "Markdown File",
  },
];

const RecycleBin = ({
  isRecycleOpen,
  toggleRecycle,
  bounds,
  isActive = false,
  bringToFront,
  isMinimized = false,
  minimizeWindow,
}) => {
  const explorerRef = useRef(null);
  const [items, setItems] = useState(MOCK_ITEMS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");

  const hasItems = items.length > 0;

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.originalLocation.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
  }, [items, search]);

  const allVisibleSelected =
    filteredItems.length > 0 &&
    filteredItems.every((item) => selectedIds.includes(item.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !filteredItems.some((item) => item.id === id))
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...filteredItems
          .filter((item) => !prev.includes(item.id))
          .map((item) => item.id),
      ]);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleRestoreSelected = () => {
    if (!selectedIds.length) return;
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const handleEmptyBin = () => {
    if (!items.length) return;
    setItems([]);
    setSelectedIds([]);
  };

  return (
    <div
      className={`${
        isRecycleOpen && !isMinimized ? "" : "hidden"
      } ${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none`}
    >
      <Draggable handle=".title-bar" nodeRef={explorerRef} bounds={bounds}>
        <div
          ref={explorerRef}
          className="window bg-black h-[80vh] md:h-[39rem] w-[calc(100vw-2rem)] md:w-[70.5rem] max-w-full rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto"
          onMouseDown={bringToFront}
        >
          <div className="title-bar" onMouseDown={bringToFront}>
            <div className="text-white h-9 w-full flex justify-end select-none">
              <button
                type="button"
                className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
                onClick={() => minimizeWindow && minimizeWindow()}
              >
                <MdMinimize />
              </button>
              <button
                type="button"
                className="hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm"
              >
                <MdCheckBoxOutlineBlank />
              </button>
              <div
                className="hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                onClick={toggleRecycle}
              >
                <MdClose />
              </div>
            </div>
          </div>
          <div className="content text-white select-none">
            <div className="absolute bg-neutral-800 top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex">
              <div className="flex justify-between items-center w-full">
                <div className="pl-2 text-xs flex">
                  <img
                    src={`/images/apps/recyclebin.png`}
                    alt="main icons"
                    className="w-5 h-5 mr-2"
                  />
                  Recycle Bin
                </div>
                <button
                  type="button"
                  className="hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg"
                >
                  <MdClose />
                </button>
              </div>
              <div className="absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl">
                <MdAdd />
              </div>
            </div>
            <div className="bg-neutral-800 w-full h-12 border-neutral-700 border-b-[1.5px] mt-1 flex items-center">
              <div className="flex justify-around w-48 py-2">
                <div className="font-extralight text-xl opacity-45">
                  <MdArrowBack />
                </div>
                <div className="font-extralight text-xl opacity-45">
                  <MdArrowForward />
                </div>
                <div className="font-extralight text-xl hover:bg-neutral-600 rounded-md hover:bg-opacity-50">
                  <MdArrowUpward />
                </div>
                <div className="font-extralight text-xl hover:bg-neutral-600 rounded-md hover:bg-opacity-50">
                  <MdRefresh />
                </div>
              </div>
              <div className="flex bg-neutral-700/70 my-1.5 rounded-md items-center text-xs px-3 mx-2 flex-grow gap-2">
                <div className="flex items-center gap-1 text-neutral-300/80">
                  <MdHome className="text-sm" />
                  <MdNavigateNext className="text-sm opacity-70" />
                  <span>Recycle Bin</span>
                </div>
                {hasItems && (
                  <span className="ml-auto hidden rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-300 md:inline-flex">
                    {items.length} item{items.length > 1 ? "s" : ""} in bin
                  </span>
                )}
              </div>
              <div className="flex justify-between bg-neutral-700/70 my-1.5 rounded-md items-center text-xs px-3 mr-3 w-[19.3em]">
                <input
                  className="w-full bg-transparent text-[11px] text-neutral-100 placeholder:text-neutral-400/80 focus:outline-none"
                  placeholder="Search Recycle Bin"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="ml-2 flex items-center justify-center rounded-md bg-black/10 p-1 text-sm text-neutral-300">
                  <MdSearch />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-900/90 w-full h-[3.4rem] border-neutral-700 border-b-[1.5px] flex justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-24 h-full text-xs gap-1 border-neutral-700 border-r-[1.5px] opacity-45">
                  <img
                    src="/images/options/new.png"
                    alt="new"
                    className="w-5 h-5"
                  />
                  New
                  <div className="text-sm">
                    <MdExpandMore />
                  </div>
                </div>
                <div className="flex h-full w-72 items-center justify-around border-neutral-700 border-r-[1.5px] text-[11px]">
                  <button
                    type="button"
                    onClick={handleRestoreSelected}
                    disabled={!selectedIds.length}
                    className="inline-flex items-center gap-1 rounded-md border border-emerald-500/40 bg-emerald-500/15 px-2 py-1 text-[11px] font-medium text-emerald-200 shadow-sm transition hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-500"
                  >
                    Restore selected
                  </button>
                  <button
                    type="button"
                    onClick={handleEmptyBin}
                    disabled={!hasItems}
                    className="inline-flex items-center gap-1 rounded-md border border-red-500/40 bg-red-500/10 px-2 py-1 text-[11px] font-medium text-red-200 shadow-sm transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:border-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-500"
                  >
                    Empty Recycle Bin
                  </button>
                </div>
                <div className="flex h-full items-center w-72 justify-around border-neutral-700 border-r-[1.5px] text-[11px]">
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-45">
                    <img
                      src="/images/options/sort.png"
                      alt="sort"
                      className="w-5 h-5"
                    />
                    Sort
                    <div className="text-sm">
                      <MdExpandMore />
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-80">
                    <img
                      src="/images/options/view.png"
                      alt="view"
                      className="w-5 h-5"
                    />
                    View
                    <div className="text-sm">
                      <MdExpandMore />
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-80">
                    <img
                      src="/images/options/filter.png"
                      alt="filter"
                      className="w-5 h-5"
                    />
                    Filter
                    <div className="text-sm">
                      <MdExpandMore />
                    </div>
                  </div>
                </div>
                <img
                  src="/images/options/dots.png"
                  alt="dots"
                  className="w-3.5 h-3.5 ml-4"
                />
              </div>
              <div className="flex items-center mr-8 text-xs">
                <img
                  src="/images/options/details.png"
                  alt="details"
                  className="w-5 h-5 mr-1"
                />
                Details
              </div>
            </div>
            <div className="flex flex-row h-full bg-neutral-900">
              <div className="w-40 md:h-[100vh] h-auto pt-2 border-neutral-700 border-r-[1.5px] px-[2px] bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
                <div className="border-b-[1.5px] border-neutral-700 h-20">
                  <div className="flex items-center justify-center mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/images/folders/home.png"
                      alt="details"
                      className="w-5 h-5 mr-1"
                    />
                    Home
                  </div>
                  <div className="flex items-center justify-center mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/images/folders/gallery.png"
                      alt="details"
                      className="w-5 h-5 mr-1"
                    />
                    Gallery
                  </div>
                </div>
                <div className="mt-3.5 border-b-[1.5px] border-neutral-700 h-52">
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/images/folders/Desktop.ico"
                      alt="details"
                      className="w-5 h-5 mr-1"
                    />
                    Desktop
                    <div className="absolute right-1 text-sm opacity-40 rotate-45">
                      <MdPushPin />
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/images/folders/Downloads.ico"
                      alt="details"
                      className="w-5 h-5 mr-1"
                    />
                    Downloads
                    <div className="absolute right-1 text-sm opacity-40 rotate-45">
                      <MdPushPin />
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/images/folders/Documents.ico"
                      alt="details"
                      className="w-5 h-5 mr-1"
                    />
                    <div className="absolute right-1 text-sm opacity-40 rotate-45">
                      <MdPushPin />
                    </div>
                    Documents
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/images/folders/Photos.ico"
                      alt="details"
                      className="w-5 h-5 mr-1"
                    />
                    Pictures
                    <div className="absolute right-1 text-sm opacity-40 rotate-45">
                      <MdPushPin />
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/images/folders/Music.ico"
                      alt="details"
                      className="w-5 h-5 mr-1"
                    />
                    Music
                    <div className="absolute right-1 text-sm opacity-40 rotate-45">
                      <MdPushPin />
                    </div>
                  </div>
                  <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                    <img
                      src="/images/folders/Videos.ico"
                      alt="details"
                      className="w-5 h-5 mr-1"
                    />
                    Videos
                    <div className="absolute right-1 text-sm opacity-40 rotate-45">
                      <MdPushPin />
                    </div>
                  </div>
                </div>
                <div className="mt-3.5 border-b-[1.5px] border-neutral-700 h-52">
                  <div className="flex items-center pl-12 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm relative">
                    <img
                      src="/images/folders/Computer.ico"
                      alt="details"
                      className="w-4 h-4 mr-1"
                    />
                    This PC
                    <div className="absolute left-2 text-lg opacity-30">
                      <MdChevronRight />
                    </div>
                  </div>
                  <div className="flex items-center pl-12 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm relative">
                    <img
                      src="/images/folders/Network.ico"
                      alt="details"
                      className="w-4 h-4 mr-1"
                    />
                    Network
                    <div className="absolute left-2 text-lg opacity-30">
                      <MdChevronRight />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 border-0 mx-auto mt-2 px-4 pb-6 text-xs text-neutral-200">
                {hasItems ? (
                  <div className="relative flex h-full flex-col rounded-xl border border-white/10 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black/95 shadow-[0_24px_70px_rgba(0,0,0,0.9)]">
                    <div className="pointer-events-none absolute inset-0 opacity-40">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.25),transparent_60%),_radial-gradient(circle_at_bottom,_rgba(16,185,129,0.2),transparent_55%)]" />
                    </div>
                    <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-2 text-[11px] text-neutral-300/90">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-neutral-500 bg-neutral-900 text-emerald-400 focus:ring-emerald-400/60"
                          checked={allVisibleSelected}
                          onChange={toggleSelectAll}
                          aria-label="Select all items"
                        />
                        <span>
                          Name
                        </span>
                      </div>
                      <div className="flex items-center gap-8 text-[11px] text-neutral-400">
                        <span>Original Location</span>
                        <span>Deleted On</span>
                        <span>Type</span>
                        <span className="w-16 text-right">Size</span>
                      </div>
                    </div>
                    <div className="relative flex-1 overflow-auto">
                      <table className="relative z-10 w-full border-separate border-spacing-0 text-[11px]">
                        <tbody>
                          {filteredItems.map((item) => {
                            const isSelected = selectedIds.includes(item.id);
                            return (
                              <tr
                                key={item.id}
                                className={`group cursor-pointer border-b border-white/5 bg-transparent transition-colors hover:bg-white/5 ${
                                  isSelected ? "bg-emerald-500/10" : ""
                                }`}
                                onClick={() => toggleSelectOne(item.id)}
                              >
                                <td className="px-4 py-2 align-middle">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      className="h-3.5 w-3.5 rounded border-neutral-500 bg-neutral-900 text-emerald-400 focus:ring-emerald-400/60"
                                      checked={isSelected}
                                      onChange={() => toggleSelectOne(item.id)}
                                      onClick={(e) => e.stopPropagation()}
                                      aria-label={`Select ${item.name}`}
                                    />
                                    <span className="truncate text-neutral-100 group-hover:text-white">
                                      {item.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-2 align-middle text-neutral-300/90">
                                  <span className="truncate">
                                    {item.originalLocation}
                                  </span>
                                </td>
                                <td className="px-4 py-2 align-middle text-neutral-300/80">
                                  {item.deletedOn}
                                </td>
                                <td className="px-4 py-2 align-middle text-neutral-300/80">
                                  {item.type}
                                </td>
                                <td className="px-4 py-2 pr-6 align-middle text-right text-neutral-200">
                                  {item.size}
                                </td>
                              </tr>
                            );
                          })}

                          {!filteredItems.length && (
                            <tr>
                              <td
                                colSpan={5}
                                className="px-4 py-10 text-center text-neutral-400"
                              >
                                No items match your search.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-700/80 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black/95 px-6 py-10 text-center shadow-[0_22px_60px_rgba(0,0,0,0.85)]">
                    <div className="mb-4 rounded-full bg-emerald-500/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                      Recycle Bin is clean
                    </div>
                    <p className="text-sm font-medium text-neutral-100">
                      Nothing to restore. You&apos;re all caught up.
                    </p>
                    <p className="mt-2 max-w-xs text-[11px] text-neutral-400">
                      Deleted items from your desktop would appear here. Use the
                      controls above to restore files or empty the bin when it&apos;s
                      full.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="absolute bottom-0 h-5 bg-neutral-900 w-full text-xs py-1 pl-2">
              <div className="flex items-center justify-center w-16 border-r-[1.5px] h-full text-xs font-extralight">
                {items.length} item{items.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default RecycleBin;
