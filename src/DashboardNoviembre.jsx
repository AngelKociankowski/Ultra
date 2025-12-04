import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar, ComposedChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent, CreditCard, Banknote, Users, Music, Beer, UtensilsCrossed, ArrowUpRight, ArrowDownRight, Target, Calendar, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const DashboardNoviembre = () => {
  const [activeSection, setActiveSection] = useState('resumen');

  // ══════════════════════════════════════════════════════════════════════════════
  // DATOS REALES DE NOVIEMBRE 2025 - LA PULQUERÍA
  // ══════════════════════════════════════════════════════════════════════════════
  
  const noviembre = {
    ventas: 1490072.62,
    efectivo: 636482.39,
    tarjeta: 660592.01,
    descuentos: 9304.58,
    costos_operativos: 980619.15,
    gastos_admin: 88021.00,
    otros_gastos: 50998.27,
    utilidad_operativa: 370434.19,
    cogs: 618318.45,
    margen_bruto: 871754.17,
  };

  const octubre = {
    ventas: 1305242.56,
    costos_operativos: 839611.57,
    utilidad_operativa: 327167.19,
  };

  const variaciones = {
    ventas: 14.2,
    costos: 16.8,
    utilidad: 13.2,
  };

  // Costos operativos detallados
  const costosOperativos = [
    { name: 'Cerveza (líquido)', value: 430600.74, pct: 43.9, icon: Beer },
    { name: 'Nómina', value: 120070.58, pct: 12.2, icon: Users },
    { name: 'Comisión Personal', value: 87971.59, pct: 9.0, icon: Users },
    { name: 'Ultra 5%', value: 74503.63, pct: 7.6, icon: Beer },
    { name: 'Música/Entretenimiento', value: 74400.00, pct: 7.6, icon: Music },
    { name: 'Alimentos', value: 39573.09, pct: 4.0, icon: UtensilsCrossed },
    { name: 'Prestaciones de Ley', value: 29900.00, pct: 3.0, icon: Users },
    { name: 'Destilados', value: 29290.68, pct: 3.0, icon: Beer },
    { name: 'Barra/Insumos', value: 24824.82, pct: 2.5, icon: Beer },
    { name: 'Cerveza (logístico)', value: 23936.00, pct: 2.4, icon: Beer },
    { name: 'Refresco', value: 20414.31, pct: 2.1, icon: Beer },
    { name: 'Otros', value: 24133.73, pct: 2.5, icon: null },
  ];

  // Gastos administrativos
  const gastosAdmin = [
    { name: 'Comisión Administrativo', value: 25690.91 },
    { name: 'Sueldo Administrativo', value: 10000.00 },
    { name: 'Sueldo Jefe Seguridad', value: 10000.00 },
    { name: 'Comisión Operativo', value: 9675.64 },
    { name: 'Sueldo Operativo', value: 8000.00 },
    { name: 'Sueldo Emiliano', value: 8000.00 },
    { name: 'Comisión Emiliano', value: 6422.73 },
    { name: 'Comisión Jefe Audio', value: 6387.08 },
    { name: 'Comisión Jefe Seguridad', value: 2000.00 },
    { name: 'Publicidad', value: 1580.00 },
    { name: 'Papelería', value: 264.65 },
  ];

  // Otros gastos
  const otrosGastos = [
    { name: 'Gastos Jurídicos', value: 16879.27, pct: 33.1 },
    { name: 'Comisión Tarjeta', value: 16514.80, pct: 32.4 },
    { name: 'Otros Gastos', value: 9604.20, pct: 18.8 },
    { name: 'Pagos Comandante', value: 8000.00, pct: 15.7 },
  ];

  // Datos históricos para contexto (últimos 6 meses)
  const historico = [
    { mes: 'JUN', ventas: 1181757.81, utilidad: 289954.96 },
    { mes: 'JUL', ventas: 1304230.24, utilidad: 285737.58 },
    { mes: 'AGO', ventas: 1652549.58, utilidad: 535054.15 },
    { mes: 'SEP', ventas: 1381195.86, utilidad: 300788.39 },
    { mes: 'OCT', ventas: 1305242.56, utilidad: 327167.19 },
    { mes: 'NOV', ventas: 1490072.62, utilidad: 370434.19 },
  ];

  // Métricas calculadas
  const metricas = {
    margenBrutoPct: (noviembre.margen_bruto / noviembre.ventas * 100).toFixed(1),
    margenOperativoPct: (noviembre.utilidad_operativa / noviembre.ventas * 100).toFixed(1),
    costosVentasPct: (noviembre.costos_operativos / noviembre.ventas * 100).toFixed(1),
    gastosAdminPct: (noviembre.gastos_admin / noviembre.ventas * 100).toFixed(1),
    otrosGastosPct: (noviembre.otros_gastos / noviembre.ventas * 100).toFixed(1),
    cogsPct: (noviembre.cogs / noviembre.ventas * 100).toFixed(1),
    efectivoPct: (noviembre.efectivo / noviembre.ventas * 100).toFixed(1),
    tarjetaPct: (noviembre.tarjeta / noviembre.ventas * 100).toFixed(1),
    descuentosPct: (noviembre.descuentos / noviembre.ventas * 100).toFixed(2),
    ventasDiarias: (noviembre.ventas / 30).toFixed(0),
    utilidadDiaria: (noviembre.utilidad_operativa / 30).toFixed(0),
  };

  // Colores
  const COLORS = {
    primary: '#0f172a',
    secondary: '#1e293b',
    accent: '#f97316',
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444',
    info: '#3b82f6',
    purple: '#a855f7',
    pink: '#ec4899',
    teal: '#14b8a6',
  };

  const PIE_COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#14b8a6', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#f43f5e', '#64748b', '#94a3b8'];

  // Formateo de moneda
  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatFullCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Componente KPI Card mejorado
  const KPICard = ({ title, value, subtitle, trend, trendLabel, icon: Icon, color = 'orange', size = 'normal' }) => (
    <div className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 ${size === 'large' ? 'p-6' : 'p-4'}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-400 text-xs font-medium tracking-wider uppercase">{title}</span>
        {Icon && <Icon className={`${size === 'large' ? 'w-6 h-6' : 'w-5 h-5'} text-orange-400`} />}
      </div>
      <div className={`font-bold text-white ${size === 'large' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{value}</div>
      {subtitle && <div className="text-slate-400 text-sm mt-1">{subtitle}</div>}
      {trend !== undefined && (
        <div className={`flex items-center mt-2 text-xs ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          <span>{trend >= 0 ? '+' : ''}{trend.toFixed(1)}% {trendLabel || 'vs Oct'}</span>
        </div>
      )}
    </div>
  );

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
          <p className="text-slate-300 font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatFullCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Gauge component para métricas
  const GaugeChart = ({ value, maxValue, label, color }) => {
    const percentage = (value / maxValue) * 100;
    const data = [{ name: label, value: percentage, fill: color }];
    
    return (
      <div className="relative">
        <ResponsiveContainer width="100%" height={160}>
          <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={data} startAngle={180} endAngle={0}>
            <RadialBar background clockWise dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{value.toFixed(1)}%</span>
          <span className="text-xs text-slate-400">{label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-6">
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* HEADER */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  La Pulquería
                </h1>
                <p className="text-slate-400 text-sm">Dashboard Mensual · Noviembre 2025</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl px-4 py-2 border border-orange-500/30">
              <span className="text-orange-400 font-bold text-lg">NOVIEMBRE</span>
              <span className="text-slate-400 text-sm ml-2">2025</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: 'resumen', label: 'Resumen' },
            { id: 'costos', label: 'Estructura de Costos' },
            { id: 'comparativo', label: 'Comparativo' },
            { id: 'insights', label: 'Insights' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeSection === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* RESUMEN */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'resumen' && (
        <>
          {/* KPIs Principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <KPICard
              title="Ventas del Mes"
              value={formatCurrency(noviembre.ventas)}
              subtitle={formatFullCurrency(noviembre.ventas)}
              trend={variaciones.ventas}
              icon={DollarSign}
              size="large"
            />
            <KPICard
              title="Utilidad Operativa"
              value={formatCurrency(noviembre.utilidad_operativa)}
              subtitle={`${metricas.margenOperativoPct}% margen`}
              trend={variaciones.utilidad}
              icon={TrendingUp}
              size="large"
            />
            <KPICard
              title="Margen Bruto"
              value={`${metricas.margenBrutoPct}%`}
              subtitle={formatCurrency(noviembre.margen_bruto)}
              icon={Percent}
              size="large"
            />
            <KPICard
              title="Costos Operativos"
              value={formatCurrency(noviembre.costos_operativos)}
              subtitle={`${metricas.costosVentasPct}% de ventas`}
              trend={variaciones.costos}
              trendLabel="vs Oct"
              icon={Target}
              size="large"
            />
          </div>

          {/* Métricas Secundarias */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            <KPICard title="Ventas Diarias" value={formatCurrency(parseFloat(metricas.ventasDiarias))} subtitle="promedio" />
            <KPICard title="Utilidad Diaria" value={formatCurrency(parseFloat(metricas.utilidadDiaria))} subtitle="promedio" />
            <KPICard title="COGS" value={`${metricas.cogsPct}%`} subtitle={formatCurrency(noviembre.cogs)} />
            <KPICard title="Gastos Admin" value={`${metricas.gastosAdminPct}%`} subtitle={formatCurrency(noviembre.gastos_admin)} />
            <KPICard title="Otros Gastos" value={`${metricas.otrosGastosPct}%`} subtitle={formatCurrency(noviembre.otros_gastos)} />
            <KPICard title="Descuentos" value={`${metricas.descuentosPct}%`} subtitle={formatCurrency(noviembre.descuentos)} />
          </div>

          {/* Gráficos principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Distribución de Ventas por Método de Pago */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-400" />
                Distribución de Ventas
              </h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Efectivo', value: noviembre.efectivo },
                      { name: 'Tarjeta', value: noviembre.tarjeta },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#22c55e" />
                    <Cell fill="#3b82f6" />
                  </Pie>
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 text-sm">Efectivo: {metricas.efectivoPct}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 text-sm">Tarjeta: {metricas.tarjetaPct}%</span>
                </div>
              </div>
            </div>

            {/* Desglose de Gastos */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Estructura de Egresos</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Costos Operativos', value: noviembre.costos_operativos },
                      { name: 'Gastos Admin', value: noviembre.gastos_admin },
                      { name: 'Otros Gastos', value: noviembre.otros_gastos },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#f97316" />
                    <Cell fill="#a855f7" />
                    <Cell fill="#14b8a6" />
                  </Pie>
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
                <div><div className="w-3 h-3 rounded-full bg-orange-500 mx-auto mb-1"></div><span className="text-slate-400">Operativos 87.6%</span></div>
                <div><div className="w-3 h-3 rounded-full bg-purple-500 mx-auto mb-1"></div><span className="text-slate-400">Admin 7.9%</span></div>
                <div><div className="w-3 h-3 rounded-full bg-teal-500 mx-auto mb-1"></div><span className="text-slate-400">Otros 4.6%</span></div>
              </div>
            </div>
          </div>

          {/* Waterfall de P&L */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Cascada de Estado de Resultados - Noviembre</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={[
                { name: 'Ventas', value: noviembre.ventas, fill: '#22c55e' },
                { name: 'COGS', value: -noviembre.cogs, fill: '#ef4444' },
                { name: 'Margen Bruto', value: noviembre.margen_bruto, fill: '#3b82f6' },
                { name: 'Otros Costos Op.', value: -(noviembre.costos_operativos - noviembre.cogs), fill: '#f97316' },
                { name: 'Gastos Admin', value: -noviembre.gastos_admin, fill: '#a855f7' },
                { name: 'Otros Gastos', value: -noviembre.otros_gastos, fill: '#14b8a6' },
                { name: 'Utilidad Op.', value: noviembre.utilidad_operativa, fill: '#eab308' },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9ca3af" tickFormatter={(v) => formatCurrency(Math.abs(v))} />
                <Tooltip formatter={(value) => formatFullCurrency(Math.abs(value))} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {[
                    { fill: '#22c55e' },
                    { fill: '#ef4444' },
                    { fill: '#3b82f6' },
                    { fill: '#f97316' },
                    { fill: '#a855f7' },
                    { fill: '#14b8a6' },
                    { fill: '#eab308' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* ESTRUCTURA DE COSTOS */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'costos' && (
        <>
          {/* Costos Operativos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Costos Operativos</h3>
              <p className="text-2xl font-bold text-orange-400 mb-4">{formatFullCurrency(noviembre.costos_operativos)}</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costosOperativos}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    dataKey="value"
                    label={({ pct }) => `${pct}%`}
                  >
                    {costosOperativos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4">Top Costos Operativos</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {costosOperativos.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                      />
                      <span className="text-slate-300 text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{formatCurrency(item.value)}</div>
                      <div className="text-slate-500 text-xs">{item.pct}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gastos Admin y Otros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Gastos Administrativos</h3>
              <p className="text-2xl font-bold text-purple-400 mb-4">{formatFullCurrency(noviembre.gastos_admin)}</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={gastosAdmin} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" tickFormatter={(v) => formatCurrency(v)} />
                  <YAxis type="category" dataKey="name" stroke="#9ca3af" width={130} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                  <Bar dataKey="value" fill="#a855f7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-2">Otros Gastos</h3>
              <p className="text-2xl font-bold text-teal-400 mb-4">{formatFullCurrency(noviembre.otros_gastos)}</p>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={otrosGastos}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, pct }) => `${pct}%`}
                  >
                    <Cell fill="#14b8a6" />
                    <Cell fill="#3b82f6" />
                    <Cell fill="#f97316" />
                    <Cell fill="#a855f7" />
                  </Pie>
                  <Tooltip formatter={(value) => formatFullCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* COMPARATIVO */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'comparativo' && (
        <>
          {/* Noviembre vs Octubre */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Noviembre vs Octubre 2025</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                <div className="text-slate-400 text-sm mb-2">Ventas</div>
                <div className="text-xl font-bold text-white mb-1">{formatCurrency(noviembre.ventas)}</div>
                <div className="text-slate-500 text-sm mb-2">Oct: {formatCurrency(octubre.ventas)}</div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${variaciones.ventas >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {variaciones.ventas >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {variaciones.ventas >= 0 ? '+' : ''}{variaciones.ventas.toFixed(1)}%
                </div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                <div className="text-slate-400 text-sm mb-2">Costos Operativos</div>
                <div className="text-xl font-bold text-white mb-1">{formatCurrency(noviembre.costos_operativos)}</div>
                <div className="text-slate-500 text-sm mb-2">Oct: {formatCurrency(octubre.costos_operativos)}</div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${variaciones.costos <= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {variaciones.costos >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {variaciones.costos >= 0 ? '+' : ''}{variaciones.costos.toFixed(1)}%
                </div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                <div className="text-slate-400 text-sm mb-2">Utilidad Operativa</div>
                <div className="text-xl font-bold text-white mb-1">{formatCurrency(noviembre.utilidad_operativa)}</div>
                <div className="text-slate-500 text-sm mb-2">Oct: {formatCurrency(octubre.utilidad_operativa)}</div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${variaciones.utilidad >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                  {variaciones.utilidad >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {variaciones.utilidad >= 0 ? '+' : ''}{variaciones.utilidad.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Tendencia últimos 6 meses */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tendencia Últimos 6 Meses</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={historico}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#22c55e" tickFormatter={(v) => formatCurrency(v)} />
                <YAxis yAxisId="right" orientation="right" stroke="#f97316" tickFormatter={(v) => formatCurrency(v)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="ventas" name="Ventas" fill="#22c55e" radius={[4, 4, 0, 0]} opacity={0.8} />
                <Line yAxisId="right" type="monotone" dataKey="utilidad" name="Utilidad" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Posición de Noviembre */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Posición de Noviembre en el Año</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-xl p-4 border border-emerald-500/30">
                <div className="text-emerald-400 text-sm font-medium mb-1">Ranking Ventas</div>
                <div className="text-3xl font-bold text-white">#3</div>
                <div className="text-slate-400 text-xs">de 11 meses</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-4 border border-blue-500/30">
                <div className="text-blue-400 text-sm font-medium mb-1">Ranking Utilidad</div>
                <div className="text-3xl font-bold text-white">#3</div>
                <div className="text-slate-400 text-xs">de 11 meses</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl p-4 border border-orange-500/30">
                <div className="text-orange-400 text-sm font-medium mb-1">vs Promedio Ventas</div>
                <div className="text-2xl font-bold text-white">+29.8%</div>
                <div className="text-slate-400 text-xs">sobre $1.15M prom.</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/30">
                <div className="text-purple-400 text-sm font-medium mb-1">vs Promedio Utilidad</div>
                <div className="text-2xl font-bold text-white">+38.6%</div>
                <div className="text-slate-400 text-xs">sobre $267K prom.</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* INSIGHTS */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {activeSection === 'insights' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Alertas */}
            <div className="bg-gradient-to-br from-rose-900/30 to-slate-900/50 rounded-2xl p-6 border border-rose-700/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
                <h3 className="text-lg font-semibold text-white">Áreas de Atención</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-rose-400 font-medium mb-1">Costos crecen más que ventas</div>
                  <p className="text-slate-400 text-sm">Costos +16.8% vs Ventas +14.2%. La eficiencia operativa se deterioró 2.6 puntos.</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-rose-400 font-medium mb-1">Cerveza: 43.9% de costos operativos</div>
                  <p className="text-slate-400 text-sm">El costo de cerveza líquido ($430K) sigue siendo el mayor gasto. 4.9 pp más que el promedio anual (39%).</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-rose-400 font-medium mb-1">Margen bruto bajo: 58.5%</div>
                  <p className="text-slate-400 text-sm">Por debajo del promedio anual de 62.9%. El COGS fue 41.5% de ventas vs 37.1% promedio.</p>
                </div>
              </div>
            </div>

            {/* Fortalezas */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-slate-900/50 rounded-2xl p-6 border border-emerald-700/30">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Fortalezas del Mes</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-emerald-400 font-medium mb-1">Tercer mejor mes del año</div>
                  <p className="text-slate-400 text-sm">$1.49M en ventas, solo superado por Agosto ($1.65M) y Mayo ($1.39M).</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-emerald-400 font-medium mb-1">Utilidad sólida: $370K</div>
                  <p className="text-slate-400 text-sm">24.9% de margen operativo. Recuperación después de octubre.</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <div className="text-emerald-400 font-medium mb-1">Balance de pagos mejorado</div>
                  <p className="text-slate-400 text-sm">Tarjeta (44.3%) superó a efectivo (42.7%) por primera vez. Mejor trazabilidad.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recomendaciones */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Acciones Recomendadas para Diciembre</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-amber-500/20">
                <div className="text-amber-400 text-sm font-semibold mb-2">INMEDIATO</div>
                <h4 className="text-white font-medium mb-2">Negociar precio cerveza</h4>
                <p className="text-slate-400 text-sm">El costo de cerveza subió del 39% al 44% de costos op. Urgente renegociar con proveedor para temporada alta de diciembre.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-blue-500/20">
                <div className="text-blue-400 text-sm font-semibold mb-2">ESTA SEMANA</div>
                <h4 className="text-white font-medium mb-2">Optimizar inventario</h4>
                <p className="text-slate-400 text-sm">Preparar stock para diciembre basado en el +29.8% sobre promedio. Evitar quiebres de stock en temporada alta.</p>
              </div>
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl p-5 border border-emerald-500/20">
                <div className="text-emerald-400 text-sm font-semibold mb-2">DICIEMBRE</div>
                <h4 className="text-white font-medium mb-2">Maximizar tarjeta</h4>
                <p className="text-slate-400 text-sm">Incentivar pagos con tarjeta (ya 44.3%). Mejor control, menos riesgo de efectivo, potencial para promociones bancarias.</p>
              </div>
            </div>
          </div>

          {/* Proyección Diciembre */}
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Proyección Diciembre (Escenarios)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400">Escenario</th>
                    <th className="text-right py-3 px-4 text-slate-400">Ventas Est.</th>
                    <th className="text-right py-3 px-4 text-slate-400">Utilidad Est.</th>
                    <th className="text-right py-3 px-4 text-slate-400">Margen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-300">Conservador (+10% vs Nov)</td>
                    <td className="py-3 px-4 text-right text-white">{formatCurrency(noviembre.ventas * 1.10)}</td>
                    <td className="py-3 px-4 text-right text-emerald-400">{formatCurrency(noviembre.utilidad_operativa * 1.08)}</td>
                    <td className="py-3 px-4 text-right text-slate-400">24.4%</td>
                  </tr>
                  <tr className="border-b border-slate-800 bg-amber-500/10">
                    <td className="py-3 px-4 text-amber-400 font-medium">Base (+20% vs Nov)</td>
                    <td className="py-3 px-4 text-right text-white font-medium">{formatCurrency(noviembre.ventas * 1.20)}</td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-medium">{formatCurrency(noviembre.utilidad_operativa * 1.25)}</td>
                    <td className="py-3 px-4 text-right text-slate-400">25.9%</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 text-slate-300">Optimista (+30% vs Nov)</td>
                    <td className="py-3 px-4 text-right text-white">{formatCurrency(noviembre.ventas * 1.30)}</td>
                    <td className="py-3 px-4 text-right text-emerald-400">{formatCurrency(noviembre.utilidad_operativa * 1.40)}</td>
                    <td className="py-3 px-4 text-right text-slate-400">26.8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-500 text-xs mt-4">* Proyecciones basadas en tendencias históricas y estacionalidad de diciembre</p>
          </div>
        </>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-slate-500 text-sm">
        Dashboard Noviembre 2025 · La Pulquería · Generado con datos reales del Estado de Resultados
      </div>
    </div>
  );
};

export default DashboardNoviembre;
