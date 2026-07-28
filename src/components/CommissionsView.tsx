import React, { useState, useMemo, useContext } from 'react';
import { 
    Plus, 
    Search, 
    DollarSign, 
    Clock, 
    CheckCircle2, 
    Edit2, 
    Trash2, 
    TrendingUp, 
    Calendar,
    ArrowUpDown,
    Check,
    X,
    Building,
    AlertCircle
} from 'lucide-react';
import { CommissionFormModal } from './CommissionFormModal';

interface CommissionsViewProps {
    commissions: any[];
    clients: any[];
    onAdd: (data: any) => Promise<boolean | void> | boolean | void;
    onUpdate: (id: string, data: any) => Promise<boolean | void> | boolean | void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
    onNavigateToClient?: (clientId: string) => void;
    isTourMode?: boolean;
}

const frequencyMap: Record<string, string> = {
    'una_vez': 'Una vez',
    'mensual': 'Mensual',
    'trimestral': 'Trimestral',
    'anual': 'Anual'
};

export const CommissionsView: React.FC<CommissionsViewProps> = ({
    commissions,
    clients,
    onAdd,
    onUpdate,
    onToggleStatus,
    onDelete,
    onNavigateToClient,
    isTourMode
}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCommission, setEditingCommission] = useState<any>(null);
    const [commissionToDelete, setCommissionToDelete] = useState<any>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'todas' | 'pendiente' | 'pagada'>('todas');

    // Summary calculations
    const stats = useMemo(() => {
        const pendingList = commissions.filter(c => c.estado === 'pendiente');
        const paidList = commissions.filter(c => c.estado === 'pagada');

        const totalPending = pendingList.reduce((acc, c) => acc + (Number(c.montoCalculado || c.monto_calculado) || 0), 0);
        const totalPaid = paidList.reduce((acc, c) => acc + (Number(c.montoCalculado || c.monto_calculado) || 0), 0);
        const totalAll = commissions.reduce((acc, c) => acc + (Number(c.montoCalculado || c.monto_calculado) || 0), 0);

        return {
            totalPending,
            pendingCount: pendingList.length,
            totalPaid,
            paidCount: paidList.length,
            totalAll,
            allCount: commissions.length
        };
    }, [commissions]);

    // Client options for dropdown
    const clientOptions = useMemo(() => {
        return clients.map((c: any) => ({
            id: c.id,
            name: c.name,
            company: c.company,
            number: c.number
        }));
    }, [clients]);

    // Filtered data
    const filteredCommissions = useMemo(() => {
        return commissions.filter(c => {
            const clientObj = clients.find((cl: any) => cl.id === c.clienteId);
            const clientName = (clientObj?.name || c.clienteNombre || '').toLowerCase();
            const conceptoStr = (c.concepto || '').toLowerCase();
            const searchLower = searchTerm.toLowerCase();

            const matchesSearch = !searchTerm || clientName.includes(searchLower) || conceptoStr.includes(searchLower);
            const matchesStatus = statusFilter === 'todas' || c.estado === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [commissions, clients, searchTerm, statusFilter]);

    const handleFormSubmit = async (formData: any) => {
        if (editingCommission) {
            await onUpdate(editingCommission.id, formData);
        } else {
            await onAdd(formData);
        }
    };

    return (
        <div id="tour-commissions-section" className="space-y-6">
            {/* Page Header */}
            <div id="tour-commissions-header" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Control de Comisiones</h1>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                        Gestión y seguimiento de comisiones fijas y porcentuales por cliente
                    </p>
                </div>
                <button
                    id="tour-commissions-add-btn"
                    disabled={isTourMode}
                    onClick={() => {
                        if (isTourMode) return;
                        setEditingCommission(null);
                        setIsFormOpen(true);
                    }}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 bg-[#203e71] text-white rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0 ${isTourMode ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-[#1a345e] cursor-pointer'}`}
                >
                    <Plus size={16} />
                    <span>Agregar comisión</span>
                </button>
            </div>

            {/* Stat Cards */}
            <div id="tour-commissions-stats" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total Comisiones Card */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Registrado</span>
                        <div className="p-2 bg-slate-100 text-slate-600 rounded-xl">
                            <TrendingUp size={16} />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-bold text-slate-900">
                            ${stats.totalAll.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h3>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            {stats.allCount} reg.
                        </span>
                    </div>
                </div>

                {/* Comisiones Pendientes Card */}
                <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Pendientes de Cobro</span>
                        <div className="p-2 bg-amber-100/80 text-amber-700 rounded-xl">
                            <Clock size={16} />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-bold text-amber-900">
                            ${stats.totalPending.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h3>
                        <span className="text-xs font-bold text-amber-700 bg-amber-100/90 px-2.5 py-0.5 rounded-full">
                            {stats.pendingCount} pendientes
                        </span>
                    </div>
                </div>

                {/* Comisiones Pagadas Card */}
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200/80 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Comisiones Pagadas</span>
                        <div className="p-2 bg-emerald-100/80 text-emerald-700 rounded-xl">
                            <CheckCircle2 size={16} />
                        </div>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <h3 className="text-2xl font-bold text-emerald-900">
                            ${stats.totalPaid.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h3>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                            {stats.paidCount} pagadas
                        </span>
                    </div>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search */}
                <div id="tour-commissions-search" className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        autoComplete="off"
                        value={searchTerm}
                        disabled={isTourMode}
                        onChange={(e) => {
                            if (isTourMode) return;
                            setSearchTerm(e.target.value);
                        }}
                        placeholder="Buscar por cliente o concepto..."
                        className={`w-full pl-9 pr-3.5 py-2 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none transition-all ${isTourMode ? 'bg-slate-100 cursor-not-allowed' : 'bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'}`}
                    />
                </div>

                {/* Status Pills */}
                <div id="tour-commissions-filter" className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 w-full sm:w-auto overflow-x-auto">
                    <button
                        type="button"
                        disabled={isTourMode}
                        onClick={(e) => {
                            if (isTourMode && e.nativeEvent?.isTrusted) return;
                            setStatusFilter('todas');
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                            statusFilter === 'todas'
                                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                                : 'text-slate-500 hover:text-slate-800'
                        } ${isTourMode ? 'cursor-not-allowed' : ''}`}
                    >
                        Todas ({stats.allCount})
                    </button>
                    <button
                        type="button"
                        disabled={isTourMode}
                        onClick={(e) => {
                            if (isTourMode && e.nativeEvent?.isTrusted) return;
                            setStatusFilter('pendiente');
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                            statusFilter === 'pendiente'
                                ? 'bg-amber-500 text-white shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800'
                        } ${isTourMode ? 'cursor-not-allowed' : ''}`}
                    >
                        Pendientes ({stats.pendingCount})
                    </button>
                    <button
                        type="button"
                        disabled={isTourMode}
                        onClick={(e) => {
                            if (isTourMode && e.nativeEvent?.isTrusted) return;
                            setStatusFilter('pagada');
                        }}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                            statusFilter === 'pagada'
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'text-slate-500 hover:text-slate-800'
                        } ${isTourMode ? 'cursor-not-allowed' : ''}`}
                    >
                        Pagadas ({stats.paidCount})
                    </button>
                </div>
            </div>

            {/* Main Table */}
            <div id="tour-commissions-table" className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                                <th className="py-3.5 px-5">Cliente</th>
                                <th className="py-3.5 px-5">Concepto</th>
                                <th className="py-3.5 px-5">Monto Calculado</th>
                                <th className="py-3.5 px-5">Frecuencia</th>
                                <th className="py-3.5 px-5">Estado</th>
                                <th className="py-3.5 px-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                            {filteredCommissions.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-16 text-center">
                                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                            <div className="p-3.5 bg-slate-100 text-slate-400 rounded-2xl mb-3">
                                                <DollarSign size={28} />
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-800 mb-1">Sin comisiones registradas</h4>
                                            <p className="text-xs text-slate-500 mb-4">
                                                {searchTerm || statusFilter !== 'todas'
                                                    ? 'No se encontraron comisiones que coincidan con los filtros aplicados.'
                                                    : 'Comienza agregando la primera comisión para tus clientes.'}
                                            </p>
                                            <button
                                                disabled={isTourMode}
                                                onClick={(e) => {
                                                    if (isTourMode && e.nativeEvent?.isTrusted) return;
                                                    setEditingCommission(null);
                                                    setIsFormOpen(true);
                                                }}
                                                className={`px-4 py-2 bg-[#203e71] text-white rounded-xl text-xs font-bold transition-colors ${isTourMode ? 'opacity-80 cursor-default' : 'hover:bg-[#1a345e]'}`}
                                            >
                                                + Agregar comisión
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredCommissions.map((c) => {
                                    const clientObj = clients.find((cl: any) => cl.id === c.clienteId);
                                    const clientName = clientObj?.name || c.clienteNombre || 'Cliente no asignado';
                                    const isPending = c.estado === 'pendiente';

                                    return (
                                        <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                                            {/* Cliente */}
                                            <td className="py-4 px-5">
                                                <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                                    {onNavigateToClient && c.clienteId ? (
                                                        <button
                                                            disabled={isTourMode}
                                                            onClick={(e) => {
                                                                if (isTourMode) return;
                                                                onNavigateToClient(c.clienteId);
                                                            }}
                                                            className={`hover:text-blue-600 hover:underline transition-all text-left font-bold ${isTourMode ? 'opacity-70 cursor-not-allowed pointer-events-none hover:no-underline' : ''}`}
                                                        >
                                                            {clientName}
                                                        </button>
                                                    ) : (
                                                        <span>{clientName}</span>
                                                    )}
                                                </div>
                                                {clientObj?.company && (
                                                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                                                        <Building size={11} /> {clientObj.company}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Concepto */}
                                            <td className="py-4 px-5 font-semibold text-slate-800">
                                                {c.concepto}
                                            </td>

                                            {/* Monto */}
                                            <td className="py-4 px-5">
                                                <div className="font-bold text-slate-900 text-sm">
                                                    ${Number(c.montoCalculado || c.monto_calculado || 0).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                                <div className="text-[11px] text-slate-500 font-medium">
                                                    {c.tipoCalculo === 'porcentual' || c.tipo_calculo === 'porcentual' ? (
                                                        <span className="text-blue-600 font-semibold">
                                                            {c.porcentaje}% de ${Number(c.montoAdministrado || c.monto_administrado || 0).toLocaleString('es-MX')}
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400">Monto fijo</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Frecuencia */}
                                            <td className="py-4 px-5">
                                                <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/70 inline-flex items-center gap-1">
                                                    <Calendar size={12} className="text-slate-400" />
                                                    {frequencyMap[c.frecuencia] || c.frecuencia || 'Una vez'}
                                                </span>
                                            </td>

                                            {/* Estado Badge */}
                                            <td className="py-4 px-5">
                                                {isPending ? (
                                                    <button
                                                        type="button"
                                                        disabled={isTourMode}
                                                        onClick={(e) => {
                                                            if (isTourMode) return;
                                                            onToggleStatus(c.id);
                                                        }}
                                                        title="Haz clic para marcar como Pagada"
                                                        className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all flex items-center gap-1.5 shadow-2xs bg-amber-50 text-amber-800 border-amber-300 ${isTourMode ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer hover:scale-105 active:scale-95 hover:bg-amber-100'}`}
                                                    >
                                                        <Clock size={12} className="text-amber-600" />
                                                        <span>Pendiente</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            if (isTourMode) return;
                                                            if (statusFilter === 'pagada') {
                                                                onToggleStatus(c.id);
                                                            }
                                                        }}
                                                        disabled={isTourMode || statusFilter !== 'pagada'}
                                                        title={statusFilter === 'pagada' ? 'Haz clic para marcar como Pendiente' : 'Pagada'}
                                                        className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-all flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border-emerald-300 ${
                                                            isTourMode ? 'opacity-50 cursor-not-allowed pointer-events-none' : statusFilter === 'pagada' ? 'cursor-pointer hover:scale-105 active:scale-95 hover:bg-emerald-100' : 'cursor-default'
                                                        }`}
                                                    >
                                                        <CheckCircle2 size={12} className="text-emerald-600" />
                                                        <span>Pagada</span>
                                                    </button>
                                                )}
                                            </td>

                                            {/* Acciones */}
                                            <td className="py-4 px-5 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {isPending && (
                                                        <button
                                                            type="button"
                                                            disabled={isTourMode}
                                                            onClick={(e) => {
                                                                if (isTourMode) return;
                                                                onToggleStatus(c.id);
                                                            }}
                                                            title="Marcar como Pagada"
                                                            className={`p-1.5 px-2.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all shadow-2xs bg-emerald-50/90 text-emerald-700 border-emerald-200 ${isTourMode ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:bg-emerald-100 cursor-pointer'}`}
                                                        >
                                                            <CheckCircle2 size={13} className="text-emerald-600" />
                                                            <span>Pasar a Pagada</span>
                                                        </button>
                                                    )}
                                                    {!isPending && statusFilter === 'pagada' && (
                                                        <button
                                                            type="button"
                                                            disabled={isTourMode}
                                                            onClick={(e) => {
                                                                if (isTourMode) return;
                                                                onToggleStatus(c.id);
                                                            }}
                                                            title="Marcar como Pendiente"
                                                            className={`p-1.5 px-2.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition-all shadow-2xs bg-amber-50/90 text-amber-800 border-amber-200 ${isTourMode ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:bg-amber-100 cursor-pointer'}`}
                                                        >
                                                            <Clock size={13} className="text-amber-600" />
                                                            <span>Pasar a Pendiente</span>
                                                        </button>
                                                    )}
                                                    <button
                                                        disabled={isTourMode}
                                                        onClick={(e) => {
                                                            if (isTourMode) return;
                                                            setEditingCommission(c);
                                                            setIsFormOpen(true);
                                                        }}
                                                        className={`p-1.5 px-2 text-blue-600 bg-blue-50/80 border border-blue-200/60 rounded-lg transition-all flex items-center gap-1 font-medium shadow-2xs ${isTourMode ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:bg-blue-100'}`}
                                                        title="Editar comisión"
                                                    >
                                                        <Edit2 size={15} className="stroke-[2.25]" />
                                                        <span className="text-[11px] font-semibold text-blue-700">Editar</span>
                                                    </button>
                                                    <button
                                                        disabled={isTourMode}
                                                        onClick={(e) => {
                                                            if (isTourMode) return;
                                                            setCommissionToDelete(c);
                                                        }}
                                                        className={`p-1.5 px-2 text-red-600 bg-red-50/80 border border-red-200/60 rounded-lg transition-all flex items-center gap-1 font-medium shadow-2xs ${isTourMode ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'hover:bg-red-100'}`}
                                                        title="Eliminar comisión"
                                                    >
                                                        <Trash2 size={15} className="stroke-[2.25]" />
                                                        <span className="text-[11px] font-semibold text-red-700">Eliminar</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <CommissionFormModal
                isOpen={isFormOpen}
                onClose={() => { setIsFormOpen(false); setEditingCommission(null); }}
                onSubmit={handleFormSubmit}
                initialData={editingCommission}
                clients={clientOptions}
            />

            {/* Confirm Delete Modal */}
            {commissionToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full p-6 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle size={24} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mb-1">
                            ¿Eliminar comisión?
                        </h3>
                        <p className="text-xs text-slate-500 mb-6">
                            Estás a punto de eliminar la comisión de <span className="font-bold text-slate-700">"{commissionToDelete.concepto}"</span>. Esta acción no se puede deshacer.
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setCommissionToDelete(null)}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(commissionToDelete.id);
                                    setCommissionToDelete(null);
                                }}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                            >
                                <Trash2 size={14} />
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
