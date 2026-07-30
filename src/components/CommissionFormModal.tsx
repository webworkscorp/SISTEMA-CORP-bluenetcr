import React, { useState, useEffect } from 'react';
import { X, Calculator, HelpCircle, DollarSign, Percent, Calendar } from 'lucide-react';

interface ClientOption {
    id: string;
    name: string;
    company?: string;
    number?: string;
}

interface CommissionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<boolean | void> | boolean | void;
    initialData?: any;
    clients: ClientOption[];
}

export const CommissionFormModal: React.FC<CommissionFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    clients
}) => {
    const [clienteId, setClienteId] = useState('');
    const [concepto, setConcepto] = useState('');
    const [tipoCalculo, setTipoCalculo] = useState<'fija' | 'porcentual'>('fija');
    const [montoFijo, setMontoFijo] = useState<string | number>('');
    const [porcentaje, setPorcentaje] = useState<string | number>('');
    const [montoAdministrado, setMontoAdministrado] = useState<string | number>('');
    const [frecuencia, setFrecuencia] = useState<'una_vez' | 'mensual' | 'trimestral' | 'anual'>('una_vez');
    const [estado, setEstado] = useState<'pendiente' | 'pagada'>('pendiente');
    const [incluyeIva, setIncluyeIva] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setClienteId(initialData.clienteId || initialData.cliente_id || '');
                setConcepto(initialData.concepto || '');
                setTipoCalculo(initialData.tipoCalculo || initialData.tipo_calculo || 'fija');
                setMontoFijo(initialData.montoFijo ?? initialData.monto_fijo ?? '');
                setPorcentaje(initialData.porcentaje ?? '');
                setMontoAdministrado(initialData.montoAdministrado ?? initialData.monto_administrado ?? '');
                setFrecuencia(initialData.frecuencia || 'una_vez');
                setEstado(initialData.estado || 'pendiente');
                setIncluyeIva(Boolean(initialData.incluyeIva ?? initialData.incluye_iva ?? false));
            } else {
                setClienteId(clients.length > 0 ? clients[0].id : '');
                setConcepto('');
                setTipoCalculo('fija');
                setMontoFijo('');
                setPorcentaje('');
                setMontoAdministrado('');
                setFrecuencia('una_vez');
                setEstado('pendiente');
                setIncluyeIva(false);
            }
            setErrorMsg(null);
            setIsSubmitting(false);
        }
    }, [isOpen, initialData, clients]);

    if (!isOpen) return null;

    // Real-time calculation logic
    const calcFixed = Number(montoFijo) || 0;
    const calcPct = Number(porcentaje) || 0;
    const calcAdmin = Number(montoAdministrado) || 0;
    const subtotalRealTime = tipoCalculo === 'fija' 
        ? calcFixed 
        : (calcPct / 100) * calcAdmin;
    const montoIvaRealTime = incluyeIva ? subtotalRealTime * 0.13 : 0;
    const montoCalculadoRealTime = subtotalRealTime + montoIvaRealTime;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);

        if (!clienteId) {
            setErrorMsg('Por favor, selecciona un cliente.');
            return;
        }

        if (!concepto.trim()) {
            setErrorMsg('Por favor, ingresa el concepto de la comisión.');
            return;
        }

        if (tipoCalculo === 'fija' && calcFixed <= 0) {
            setErrorMsg('Por favor, ingresa una comisión fija mayor a 0.');
            return;
        }

        if (tipoCalculo === 'porcentual') {
            if (calcPct <= 0) {
                setErrorMsg('Por favor, ingresa un porcentaje mayor a 0.');
                return;
            }
            if (calcAdmin <= 0) {
                setErrorMsg('Por favor, ingresa el monto administrado sobre el cual se calculará.');
                return;
            }
        }

        setIsSubmitting(true);
        try {
            const formData = {
                id: initialData?.id,
                clienteId,
                concepto: concepto.trim(),
                tipoCalculo,
                montoFijo: tipoCalculo === 'fija' ? calcFixed : 0,
                porcentaje: tipoCalculo === 'porcentual' ? calcPct : 0,
                montoAdministrado: tipoCalculo === 'porcentual' ? calcAdmin : 0,
                subtotal: subtotalRealTime,
                incluyeIva,
                montoIva: montoIvaRealTime,
                montoCalculado: montoCalculadoRealTime,
                frecuencia,
                estado
            };

            const result = await onSubmit(formData);
            if (result !== false) {
                onClose();
            }
        } catch (err: any) {
            setErrorMsg(err.message || 'Error al procesar la comisión.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                            <Calculator size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-800">
                                {initialData ? 'Editar Comisión' : 'Nueva Comisión'}
                            </h3>
                            <p className="text-xs text-slate-500">
                                {initialData ? 'Modifica los valores de la comisión registrada' : 'Registra una nueva comisión para un cliente'}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        type="button"
                        className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <form autoComplete="off" onSubmit={handleSubmit} className="p-6 space-y-5">
                    {errorMsg && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700">
                            {errorMsg}
                        </div>
                    )}

                    {/* Selector de Cliente */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Cliente <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={clienteId}
                            onChange={(e) => setClienteId(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                            required
                        >
                            <option value="" disabled>Selecciona un cliente</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name} {c.company ? `(${c.company})` : ''}
                                </option>
                            ))}
                        </select>
                        {clients.length === 0 && (
                            <p className="text-xs text-amber-600 mt-1">No hay clientes registrados en el sistema.</p>
                        )}
                    </div>

                    {/* Concepto */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Concepto <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            value={concepto}
                            onChange={(e) => setConcepto(e.target.value)}
                            placeholder="Ej. Comisión de constitución, Administración mensual"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                            required
                        />
                    </div>

                    {/* Tipo de cálculo */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                            Tipo de comisión
                        </label>
                        <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-100/70 rounded-xl border border-slate-200/60">
                            <button
                                type="button"
                                onClick={() => setTipoCalculo('fija')}
                                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                    tipoCalculo === 'fija'
                                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                <DollarSign size={14} />
                                Comisión fija
                            </button>
                            <button
                                type="button"
                                onClick={() => setTipoCalculo('porcentual')}
                                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                                    tipoCalculo === 'porcentual'
                                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                <Percent size={14} />
                                Comisión porcentual
                            </button>
                        </div>
                    </div>

                    {/* Conditional Inputs */}
                    {tipoCalculo === 'fija' ? (
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Comisión fija ($) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                                <input
                                    type="number"
                                    autoComplete="off"
                                    step="0.01"
                                    min="0"
                                    value={montoFijo}
                                    onChange={(e) => setMontoFijo(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                    Porcentaje (%) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        autoComplete="off"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        value={porcentaje}
                                        onChange={(e) => setPorcentaje(e.target.value)}
                                        placeholder="ej. 10"
                                        className="w-full pr-8 pl-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        required
                                    />
                                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                    Monto administrado ($) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                                    <input
                                        type="number"
                                        autoComplete="off"
                                        step="0.01"
                                        min="0"
                                        value={montoAdministrado}
                                        onChange={(e) => setMontoAdministrado(e.target.value)}
                                        placeholder="ej. 50000"
                                        className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        required
                                    />
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1 flex items-start gap-1 leading-tight">
                                    <HelpCircle size={13} className="text-blue-500 shrink-0 mt-0.5" />
                                    <span>Escribe el monto sobre el cual se calculará este porcentaje.</span>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Opción IVA 13% */}
                    <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/80 flex items-center justify-between">
                        <div className="space-y-0.5 pr-2">
                            <label htmlFor="incluyeIvaToggle" className="text-xs font-bold text-slate-800 flex items-center gap-1.5 cursor-pointer">
                                <span>Aplicar IVA (13%)</span>
                                <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-2 py-0.5 rounded-md border border-blue-200">
                                    +13% IVA
                                </span>
                            </label>
                            <p className="text-[11px] text-slate-500">
                                Calcula e incluye el 13% de Impuesto al Valor Agregado sobre el subtotal de la comisión.
                            </p>
                        </div>
                        <button
                            type="button"
                            id="incluyeIvaToggle"
                            onClick={() => setIncluyeIva(!incluyeIva)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                incluyeIva ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                    incluyeIva ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>

                    {/* REAL-TIME PREVIEW CARD */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-blue-50/90 border border-blue-200/70 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-600">
                            <span>Subtotal Base:</span>
                            <span className="font-bold text-slate-800">
                                ${subtotalRealTime.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                        {incluyeIva && (
                            <div className="flex items-center justify-between text-xs text-blue-700 font-medium">
                                <span className="flex items-center gap-1">
                                    IVA (13%):
                                </span>
                                <span className="font-bold">
                                    +${montoIvaRealTime.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        )}
                        <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between">
                            <div>
                                <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                                    Monto total a cobrar
                                </span>
                                <p className="text-[11px] text-slate-500">
                                    {tipoCalculo === 'fija' 
                                        ? 'Comisión fija' 
                                        : `${calcPct}% de $${calcAdmin.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                    } {incluyeIva ? '(incluye 13% IVA)' : '(sin IVA)'}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-black text-blue-950">
                                    ${montoCalculadoRealTime.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Frecuencia & Estado */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                <Calendar size={14} className="text-slate-400" /> Frecuencia
                            </label>
                            <select
                                value={frecuencia}
                                onChange={(e) => setFrecuencia(e.target.value as any)}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                            >
                                <option value="una_vez">Una vez</option>
                                <option value="mensual">Mensual</option>
                                <option value="trimestral">Trimestral</option>
                                <option value="anual">Anual</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                                Estado Inicial
                            </label>
                            <div className="flex items-center gap-2 p-1 bg-slate-100/70 rounded-xl border border-slate-200/60">
                                <button
                                    type="button"
                                    onClick={() => setEstado('pendiente')}
                                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                                        estado === 'pendiente'
                                            ? 'bg-amber-500 text-white shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    Pendiente
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEstado('pagada')}
                                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                                        estado === 'pagada'
                                            ? 'bg-emerald-600 text-white shadow-xs'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    Pagada
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || clients.length === 0}
                            className="px-5 py-2.5 rounded-xl bg-[#203e71] hover:bg-[#1a345e] text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting ? 'Guardando...' : (initialData ? 'Guardar Cambios' : 'Agregar Comisión')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
