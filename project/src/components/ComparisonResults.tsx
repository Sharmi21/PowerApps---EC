import { Download, RefreshCw } from 'lucide-react';
import { ComparisonResult } from '../types';
import { exportToExcel } from '../utils/excelExport';

interface ComparisonResultsProps {
  results: ComparisonResult;
  onReset: () => void;
}

export default function ComparisonResults({ results, onReset }: ComparisonResultsProps) {
  const handleDownload = () => {
    exportToExcel(results);
  };

  const mismatchCount = results.details.filter(row => row.status === 'mismatch').length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Comparison Results</h2>
            <p className="text-sm text-slate-600 mt-1">
              Processed in {results.processingTime.toFixed(2)}s
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium
                       hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Excel
            </button>
            <button
              onClick={onReset}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg font-medium
                       hover:bg-slate-700 transition-colors duration-200 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              New Comparison
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">Total Users</p>
            <p className="text-2xl font-bold text-slate-800">{results.details.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">Matches</p>
            <p className="text-2xl font-bold text-green-700">
              {results.details.length - mismatchCount}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-600 mb-1">Mismatches</p>
            <p className="text-2xl font-bold text-red-700">{mismatchCount}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-1">CSV Total</p>
            <p className="text-2xl font-bold text-slate-800">{results.summary.totalCsvCount}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">User</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Created By</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">CSV Count</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">JSON Count</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Difference</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.details.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-slate-100 ${
                    row.status === 'mismatch' ? 'bg-red-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-4 text-sm text-slate-800">{row.user}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{row.createdBy}</td>
                  <td className="py-3 px-4 text-sm text-slate-800 text-right">{row.csvCount}</td>
                  <td className="py-3 px-4 text-sm text-slate-800 text-right">{row.jsonCount}</td>
                  <td className="py-3 px-4 text-sm text-slate-800 text-right font-medium">
                    {row.mismatched}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === 'match'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {row.status === 'match' ? 'Match' : 'Mismatch'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Metric</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">Total CSV Count (Sum of Bo)</td>
                <td className="py-3 px-4 text-sm text-slate-800 text-right font-medium">{results.summary.totalCsvCount}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">Total JSON Count (Sum of Blop)</td>
                <td className="py-3 px-4 text-sm text-slate-800 text-right font-medium">{results.summary.totalJsonCount}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">Files containing 'Nearmiss'</td>
                <td className="py-3 px-4 text-sm text-slate-800 text-right font-medium">{results.summary.nearmissCount}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">Files containing 'Hazard'</td>
                <td className="py-3 px-4 text-sm text-slate-800 text-right font-medium">{results.summary.hazardCount}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">Files containing 'HarmInjury'</td>
                <td className="py-3 px-4 text-sm text-slate-800 text-right font-medium">{results.summary.harmInjuryCount}</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">Files containing 'Product'</td>
                <td className="py-3 px-4 text-sm text-slate-800 text-right font-medium">{results.summary.productCount}</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-800">Files containing 'SalesDelivery'</td>
                <td className="py-3 px-4 text-sm text-slate-800 text-right font-medium">{results.summary.salesDeliveryCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
