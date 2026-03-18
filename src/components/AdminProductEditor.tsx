import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import type { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { setProducts } from '../lib/productStore';

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('Failed to read image.'));
    reader.readAsDataURL(file);
  });
}

export function AdminProductEditor({
  onLogout,
  embedded = false,
  showSignOut = true,
}: {
  onLogout: () => void;
  embedded?: boolean;
  showSignOut?: boolean;
}) {
  const products = useProducts();
  const [draft, setDraft] = useState<Product[]>(products);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const dirtyRef = useRef(false);

  useEffect(() => setDraft(products), [products]);

  const maxDraftId = useMemo(() => {
    return draft.reduce((m, p) => Math.max(m, p.id), 0);
  }, [draft]);

  const accent = (p: Product) => p.accentColor || '#5D3A1A';

  const updateDraft = (productId: number, patch: Partial<Product>) => {
    dirtyRef.current = true;
    setDraft((prev) => prev.map((p) => (p.id === productId ? { ...p, ...patch } : p)));
  };

  const editorSubtitle = useMemo(() => `Editing ${draft.length} products`, [draft.length]);

  const addProduct = () => {
    const fallbackImage = products[0]?.image || draft[0]?.image || '';
    const nextId = maxDraftId + 1;
    const newProduct: Product = {
      id: nextId,
      name: `Product ${nextId}`,
      blend: '',
      description: '',
      image: fallbackImage,
      accentColor: '#5D3A1A',
      lifestyleImage1: undefined,
      lifestyleImage2: undefined,
      roast: undefined,
      process: undefined,
      size: undefined,
      amazonLink: undefined,
      flipkartLink: undefined,
    };
    setDraft((prev) => [newProduct, ...prev]);
    setSaveMessage('New product added. Upload images + fill details, then Save all.');
  };

  const removeProduct = (id: number) => {
    const ok = window.confirm(`Remove product ${id}? This cannot be undone unless you Reset.`);
    if (!ok) return;
    setDraft((prev) => prev.filter((p) => p.id !== id));
    setSaveMessage(`Removed product ${id}.`);
  };

  const saveAll = () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      setProducts(draft);
      dirtyRef.current = false;
      setSaveMessage('Saved! PLP and PDP updated.');
    } catch (err) {
      setSaveMessage(err instanceof Error ? err.message : 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const revert = () => {
    setDraft(products);
    dirtyRef.current = false;
    setSaveMessage('Reverted to last saved data.');
  };

  // Auto-apply changes (debounced) so PDP always matches what you see in the editor.
  useEffect(() => {
    if (!dirtyRef.current) return;
    const t = window.setTimeout(() => {
      if (!dirtyRef.current) return;
      try {
        setProducts(draft);
        dirtyRef.current = false;
        setSaveMessage('Updated. PLP and PDP refreshed.');
      } catch {
        // Keep silent; user can still use Save all if auto-save fails.
      }
    }, 800);
    return () => window.clearTimeout(t);
  }, [draft]);

  return (
    <div className={embedded ? 'w-full' : 'min-h-screen w-full bg-[#fbf5ee] p-6'}>
      <div className={embedded ? '' : 'max-w-6xl mx-auto'}>
        {!embedded && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-serif text-[#2A1A12] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                Admin
              </h1>
              <p className="text-[#2A1A12] text-sm">{editorSubtitle}</p>
            </div>
            {showSignOut && (
              <button
                type="button"
                onClick={onLogout}
                className="px-5 py-2.5 bg-[#2A1A12] text-[#fbf5ee] rounded-full text-sm font-medium hover:bg-[#3d2818] transition-colors"
              >
                Sign out
              </button>
            )}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#2A1A12]/10 shadow-lg p-5 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-left">
              <h2 className="text-sm font-medium text-[#2A1A12]">Products (PLP + PDP)</h2>
              <p className="text-xs text-[#2A1A12] mt-2">
                Uploading images stores them in{' '}
                <code className="bg-[#fbf5ee] px-1 rounded text-[#2A1A12]">localStorage</code>.
              </p>
            </div>

            <div className="flex gap-3">
                <button
                  type="button"
                  onClick={addProduct}
                  disabled={saving}
                  className="px-5 py-2.5 bg-[#fbf5ee] border border-[#2A1A12]/15 text-[#2A1A12] rounded-full text-sm font-medium hover:bg-[#f2eadc] transition-colors disabled:opacity-50"
                >
                  + Add product
                </button>
              <button
                type="button"
                onClick={revert}
                disabled={saving}
                className="px-5 py-2.5 bg-[#fbf5ee] border border-[#2A1A12]/15 text-[#2A1A12] rounded-full text-sm font-medium hover:bg-[#f2eadc] transition-colors disabled:opacity-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={saveAll}
                disabled={saving}
                className="px-5 py-2.5 bg-[#2A1A12] text-[#fbf5ee] rounded-full text-sm font-medium hover:bg-[#3d2818] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving…' : 'Save all'}
              </button>
            </div>
          </div>

          {saveMessage && (
            <p className="text-xs text-[#2A1A12] mt-4" role="status">
              {saveMessage}
            </p>
          )}
        </div>

        <div className="space-y-6">
          {draft.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-[#2A1A12]/10 shadow-lg p-5 md:p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="text-left">
                  <h3 className="text-[#2A1A12] text-lg font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {p.name || `Product ${p.id}`}
                  </h3>
                  <p className="text-xs text-[#5D3A1A]/70 mt-1">ID: {p.id}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl border border-[#2A1A12]/10" style={{ backgroundColor: accent(p) }} />
                  <button
                    type="button"
                    onClick={() => removeProduct(p.id)}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#fbf5ee] border border-[#2A1A12]/15 text-[#2A1A12] hover:bg-[#f2eadc] transition-colors"
                    disabled={saving}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-1">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-[#fbf5ee] border border-[#2A1A12]/10 flex items-center justify-center p-3">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain rounded-xl" />
                    ) : (
                      <div className="text-xs text-[#5D3A1A]/60">No image</div>
                    )}
                  </div>
                  <label className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-[#8B4513]/50 text-[#2A1A12] text-sm cursor-pointer hover:border-[#8B4513] hover:bg-[#fbf5ee]/50 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload main
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const url = await fileToDataUrl(file);
                        updateDraft(p.id, { image: url });
                      }}
                    />
                  </label>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Name</label>
                      <input
                        value={p.name}
                        onChange={(e) => updateDraft(p.id, { name: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl border border-[#2A1A12]/15 bg-white text-[#2A1A12] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Accent</label>
                      <input
                        type="color"
                        value={p.accentColor || '#5D3A1A'}
                        onChange={(e) => updateDraft(p.id, { accentColor: e.target.value })}
                        className="w-14 h-10 rounded-xl border border-[#2A1A12]/15 bg-white"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-[#5D3A1A] block mb-2">Blend</label>
                    <input
                      value={p.blend}
                      onChange={(e) => updateDraft(p.id, { blend: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-[#2A1A12]/15 bg-white text-[#2A1A12] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/40"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-xs text-[#5D3A1A] block mb-2">Description</label>
                    <textarea
                      value={p.description}
                      onChange={(e) => updateDraft(p.id, { description: e.target.value })}
                      rows={3}
                        className="w-full px-4 py-2 rounded-xl border border-[#2A1A12]/15 bg-white text-[#2A1A12] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Roast</label>
                      <input
                        value={p.roast || ''}
                        onChange={(e) => updateDraft(p.id, { roast: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-[#2A1A12]/15 bg-white text-[#2A1A12] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Process</label>
                      <input
                        value={p.process || ''}
                        onChange={(e) => updateDraft(p.id, { process: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-[#2A1A12]/15 bg-white text-[#2A1A12] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Size</label>
                      <input
                        value={p.size || ''}
                        onChange={(e) => updateDraft(p.id, { size: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-[#2A1A12]/15 bg-white text-[#2A1A12] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Amazon link</label>
                      <input
                        value={p.amazonLink || ''}
                        onChange={(e) => updateDraft(p.id, { amazonLink: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-[#2A1A12]/15 bg-white text-[#2A1A12] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Flipkart link</label>
                      <input
                        value={p.flipkartLink || ''}
                        onChange={(e) => updateDraft(p.id, { flipkartLink: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl border border-[#2A1A12]/15 bg-white text-[#2A1A12] focus:outline-none focus:ring-2 focus:ring-[#8B4513]/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Lifestyle Image 1</label>
                      <div className="h-28 rounded-xl bg-white border border-[#2A1A12]/10 overflow-hidden flex items-center justify-center p-2 mb-3">
                        {p.lifestyleImage1 ? (
                          <img src={p.lifestyleImage1} alt="Lifestyle 1" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-[11px] text-[#5D3A1A]/60">No image</div>
                        )}
                      </div>
                      <label className="block py-2 px-3 rounded-xl border border-dashed border-[#8B4513]/50 text-xs cursor-pointer hover:bg-[#f2eadc] transition-colors">
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = await fileToDataUrl(file);
                            updateDraft(p.id, { lifestyleImage1: url });
                          }}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="text-xs text-[#5D3A1A] block mb-2">Lifestyle Image 2</label>
                      <div className="h-28 rounded-xl bg-white border border-[#2A1A12]/10 overflow-hidden flex items-center justify-center p-2 mb-3">
                        {p.lifestyleImage2 ? (
                          <img src={p.lifestyleImage2} alt="Lifestyle 2" className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-[11px] text-[#5D3A1A]/60">No image</div>
                        )}
                      </div>
                      <label className="block py-2 px-3 rounded-xl border border-dashed border-[#8B4513]/50 text-xs cursor-pointer hover:bg-[#f2eadc] transition-colors">
                        Replace
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const url = await fileToDataUrl(file);
                            updateDraft(p.id, { lifestyleImage2: url });
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

