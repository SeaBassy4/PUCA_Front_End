import OrdersHistoryTable from "../components/history/OrdersHistoryTable";
import SearchBox from "../components/SearchBox";
const HistoryPage = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-row p-4 w-[90%]">
        <h2 className="text-2xl font-bold ">Historial de Órdenes</h2>
        <SearchBox value="" onChange={() => {}} />
      </div>
      <OrdersHistoryTable />
    </div>
  );
};

export default HistoryPage;
