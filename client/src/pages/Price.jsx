

import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Navbar from '../components/Nabar';
import Footer from '../components/Footer';

function Price() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [adminPasscode, setAdminPasscode] = useState('');
  const [isEditGateOpen, setIsEditGateOpen] = useState(false);
  const [adminError, setAdminError] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [customizedPrice, setCustomizedPrice] = useState('');

  const [editingNoteId, setEditingNoteId] = useState(null);

  const [notebookList, setNotebookList] = useState([]);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);

  const [isSavingPackages, setIsSavingPackages] = useState(false);
  const [packageSaveError, setPackageSaveError] = useState('');

  // =========================================================
  // API
  // =========================================================

  const API_BASE =
    'https://habesha-film-production-server.onrender.com';

  const NOTEBOOK_API = `${API_BASE}/api/notebook`;
  const PACKAGES_API = `${API_BASE}/api/packages`;
  const PACKAGES_UPDATE_API =
    `${API_BASE}/api/packages/update`;
  const AUTH_API =
    `${API_BASE}/api/auth/verify-passcode`;

  // =========================================================
  // DEFAULT PACKAGES
  // =========================================================

  const defaultPackages = {
    premium: {
      tier: 'Ultimate VIP',
      name: 'Premium',
      price: '$1,000+',
      services: [
        '• ቪድዮ ቀረጻ (Unlimited)',
        '• ክልተ ኤክስፐርት ካሜራማን',
        '• Cinematic Color Grading & VFX',
      ],
      features: [
        '✓ ዘይተወሰነ ሰዓታት ቀረጻ (Unlimited)',
        '✓ ክልተ ኤክስፐርት ካሜራማን',
        '✓ Cinematic Color Grading & VFX',
        '🎁 ቦናስ: ምሉእ ድሮን ቀረጻ + ሓደ ነጻ ዌብሳይት ባነር',
      ],
    },

    gold: {
      tier: 'Top Tier',
      name: 'Gold',
      price: '300,000',
      services: [
        '• ስቱዲዮ / ኣብ መስክ (2 ካሜራ: 1 ቪድዮ፣ 1 ፎቶ)',
        '• ቃል ኪዳን (2 ካሜራ: 1 ቪድዮ፣ 1 ፎቶ)',
        '• መዓልቲ መርዓ (5 ካሜራ: 4 ቪድዮ፣ 1 ፎቶ)',
        '• ሓማውቲ (1 ቪድዮ፣ 1 ፎቶ)',
        '• ኩሉ ሶፍት ኮፒ (All Soft Copy)',
      ],
      features: [
        '✓ 800 ፎቶዎች (10×15)',
        '✓ 2 ላሚኔትድ ፎቶ (30×90 & 30×60)',
        '✓ 2 ሳይን ቦርድ (30×45)',
        '✓ 3 ቦርድ (50×80, 40×60, 30×45)',
        '✓ 400 ምስጋና ካርድ (Thank You Card)',
        '✓ 8 ዩኤስቢ ፍላሽ (64 GB)',
        '✓ 2 ባነር',
        '✓ 2 ራማ / ቆብዕ (Cap)',
      ],
    },

    silver: {
      tier: 'Advanced',
      name: 'Silver',
      price: '240,000',
      services: [
        '• ስቱዲዮ / ኣብ መስክ (2 ካሜራ: 1 ቪድዮ፣ 1 ፎቶ)',
        '• ቃል ኪዳን (2 ካሜራ: 1 ቪድዮ፣ 1 ፎቶ)',
        '• መዓልቲ መርዓ (4 ካሜራ: 3 ቪድዮ፣ 1 ፎቶ)',
        '• ሓማውቲ (1 ቪድዮ፣ 1 ፎቶ)',
      ],
      features: [
        '✓ 500 ፎቶዎች (10×15)',
        '✓ 2 ላሚኔትድ ፎቶ (30×90 & 40×60)',
        '✓ 1 ሳይን ቦርድ (30×45)',
        '✓ 2 ቦርድ (50×80 & 40×60)',
        '✓ 250 ምስጋና ካርድ (Thank You Card)',
        '✓ 6 ዩኤስቢ ፍላሽ (64 GB)',
        '✓ 2 ባነር',
        '✓ 2 ራማ / ቆብዕ (Cap)',
      ],
    },

    standard: {
      tier: 'Standard',
      name: 'Standard',
      price: '190,000',
      services: [
        '• ስቱዲዮ / ኣብ መስክ (1 ቪድዮ፣ 1 ፎቶ)',
        '• ቃል ኪዳን (2 ካሜራ: 1 ቪድዮ፣ 1 ፎቶ)',
        '• መዓልቲ መርዓ (3 ካሜራ: 2 ቪድዮ፣ 1 ፎቶ)',
        '• ሓማውቲ (2 ካሜራ: 1 ፎቶ፣ 1 ቪድዮ)',
      ],
      features: [
        '✓ 300 ፎቶዎች (10×15)',
        '✓ 1 ላሚኔትድ ፎቶ (30×90)',
        '✓ 1 ሳይን ቦርድ (30×45)',
        '✓ 1 ቦርድ (50×80)',
        '✓ 200 ምስጋና ካርድ (Thank You Card)',
        '✓ 4 ዩኤስቢ ፍላሽ (64 GB)',
        '✓ 2 ባነር',
        '✓ 2 ራማ / ቆብዕ (Cap)',
      ],
    },
  };

  const [packages, setPackages] = useState(
    defaultPackages
  );

  const [tempPackages, setTempPackages] =
    useState(defaultPackages);

  // =========================================================
  // HELPERS
  // =========================================================

  const deepClone = (value) => {
    return JSON.parse(JSON.stringify(value));
  };

  const normalizePackage = (
    pkg,
    fallback
  ) => {
    return {
      ...(fallback || {}),
      ...(pkg || {}),

      tier:
        typeof pkg?.tier === 'string'
          ? pkg.tier
          : fallback?.tier || '',

      name:
        typeof pkg?.name === 'string'
          ? pkg.name
          : fallback?.name || '',

      price:
        typeof pkg?.price === 'string'
          ? pkg.price
          : fallback?.price || '',

      services: Array.isArray(
        pkg?.services
      )
        ? pkg.services
        : fallback?.services || [],

      features: Array.isArray(
        pkg?.features
      )
        ? pkg.features
        : fallback?.features || [],
    };
  };

  const normalizePackagesResponse = (
    data
  ) => {
    let source = data;

    if (data?.packages) {
      source = data.packages;
    } else if (data?.data) {
      source = data.data;
    } else if (data?.result) {
      source = data.result;
    }

    return {
      premium: normalizePackage(
        source?.premium,
        defaultPackages.premium
      ),

      gold: normalizePackage(
        source?.gold,
        defaultPackages.gold
      ),

      silver: normalizePackage(
        source?.silver,
        defaultPackages.silver
      ),

      standard: normalizePackage(
        source?.standard,
        defaultPackages.standard
      ),
    };
  };

  const normalizeNotebook = (
    note
  ) => {
    if (
      !note ||
      typeof note !== 'object'
    ) {
      return null;
    }

    const normalizedId =
      note.id ??
      note._id?.$oid ??
      note._id ??
      note.id?.$oid ??
      null;

    return {
      ...note,

      id: normalizedId,

      _id:
        note._id ??
        normalizedId,

      customerName:
        note.customerName || '',

      bookingDate:
        note.bookingDate || '',

      packageName:
        note.packageName || '',

      packagePrice:
        note.packagePrice || '',

      tier:
        note.tier || '',

      packageServices:
        Array.isArray(
          note.packageServices
        )
          ? note.packageServices
          : [],

      packageFeatures:
        Array.isArray(
          note.packageFeatures
        )
          ? note.packageFeatures
          : [],

      timestamp:
        note.timestamp ||
        note.createdAt ||
        new Date().toLocaleString(),
    };
  };

  const extractNotebookArray = (
    data
  ) => {
    if (Array.isArray(data)) {
      return data;
    }

    if (
      Array.isArray(
        data?.notes
      )
    ) {
      return data.notes;
    }

    if (
      Array.isArray(
        data?.notebooks
      )
    ) {
      return data.notebooks;
    }

    if (
      Array.isArray(
        data?.bookings
      )
    ) {
      return data.bookings;
    }

    if (
      Array.isArray(
        data?.data
      )
    ) {
      return data.data;
    }

    if (
      Array.isArray(
        data?.result
      )
    ) {
      return data.result;
    }

    if (data?.note) {
      return [data.note];
    }

    return [];
  };

  const getNotebookId = (
    note
  ) => {
    return (
      note?.id ??
      note?._id?.$oid ??
      note?._id ??
      note?.id?.$oid ??
      null
    );
  };

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    let mounted = true;

    const loadPackages = async () => {
      try {
        const response =
          await fetch(
            PACKAGES_API,
            {
              method: 'GET',
              cache: 'no-store',
              headers: {
                Accept:
                  'application/json',
              },
            }
          );

        if (!response.ok) {
          throw new Error(
            `Packages API error: ${response.status}`
          );
        }

        const data =
          await response.json();

        console.log(
          'Packages GET response:',
          data
        );

        const normalizedPackages =
          normalizePackagesResponse(
            data
          );

        if (mounted) {
          setPackages(
            normalizedPackages
          );

          setTempPackages(
            deepClone(
              normalizedPackages
            )
          );
        }
      } catch (err) {
        console.error(
          'Failed to load packages:',
          err
        );
      }
    };

    const loadNotebook =
      async () => {
        try {
          const response =
            await fetch(
              NOTEBOOK_API,
              {
                method: 'GET',
                cache: 'no-store',
                headers: {
                  Accept:
                    'application/json',
                },
              }
            );

          if (!response.ok) {
            throw new Error(
              `Notebook API error: ${response.status}`
            );
          }

          const data =
            await response.json();

          const notes =
            extractNotebookArray(
              data
            )
              .map(
                normalizeNotebook
              )
              .filter(Boolean);

          if (mounted) {
            setNotebookList(
              notes
            );
          }

          console.log(
            'Notebook loaded:',
            notes
          );
        } catch (err) {
          console.error(
            'Failed to load notebook:',
            err
          );
        }
      };

    const loadAuth = () => {
      const authData =
        localStorage.getItem(
          'priceAuthData'
        );

      if (!authData) {
        return;
      }

      try {
        const parsed =
          JSON.parse(
            authData
          );

        if (
          parsed?.expiry &&
          Date.now() <
            Number(
              parsed.expiry
            )
        ) {
          setIsAuthenticated(
            true
          );
        } else {
          localStorage.removeItem(
            'priceAuthData'
          );

          setIsAuthenticated(
            false
          );
        }
      } catch {
        localStorage.removeItem(
          'priceAuthData'
        );
      }
    };

    loadPackages();
    loadNotebook();
    loadAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    try {
      const response =
        await fetch(
          AUTH_API,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
              Accept:
                'application/json',
            },

            body: JSON.stringify({
              passcode:
                passcode.trim(),
            }),
          }
        );

      const data =
        await response.json();

      if (
        response.ok &&
        data?.success
      ) {
        setIsAuthenticated(
          true
        );

        const expiryDuration =
          10 * 60 * 1000;

        localStorage.setItem(
          'priceAuthData',
          JSON.stringify({
            value: 'true',
            expiry:
              Date.now() +
              expiryDuration,
          })
        );

        setPasscode('');
      } else {
        setError(true);
      }
    } catch (err) {
      console.error(
        'Error verifying passcode:',
        err
      );

      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ADMIN EDIT GATE
  // =========================================================

  const handleEditGateSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      adminPasscode.trim() ===
      'ADMIN2026'
    ) {
      setAdminError(false);
      setAdminPasscode('');

      setTempPackages(
        deepClone(packages)
      );

      setIsEditGateOpen(true);
      setIsEditMode(true);
    } else {
      setAdminError(true);
    }
  };

  // =========================================================
  // PACKAGE UPDATE HELPERS
  // =========================================================

  const updateTempPackageField =
    (
      key,
      field,
      value
    ) => {
      setTempPackages(
        (prev) => ({
          ...prev,

          [key]: {
            ...prev[key],
            [field]:
              value,
          },
        })
      );
    };

  const updateTempPackageArray =
    (
      key,
      field,
      value
    ) => {
      const arrayValue =
        String(value)
          .split('\n')
          .map(
            (item) =>
              item.trim()
          )
          .filter(Boolean);

      setTempPackages(
        (prev) => ({
          ...prev,

          [key]: {
            ...prev[key],
            [field]:
              arrayValue,
          },
        })
      );
    };

  // =========================================================
  // SAVE MAIN WEBSITE PACKAGES
  // =========================================================

  const handleSaveAndExit =
    async () => {
      if (
        isSavingPackages
      ) {
        return;
      }

      setIsSavingPackages(
        true
      );

      setPackageSaveError('');

      try {
        const payload =
          deepClone(
            tempPackages
          );

        console.log(
          'Saving packages:',
          payload
        );

        const response =
          await fetch(
            PACKAGES_UPDATE_API,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',

                Accept:
                  'application/json',
              },

              body: JSON.stringify(
                payload
              ),
            }
          );

        let data = null;

        try {
          data =
            await response.json();
        } catch {
          data = null;
        }

        console.log(
          'Packages UPDATE response:',
          response.status,
          data
        );

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `Package update failed: ${response.status}`
          );
        }

        const returnedPackages =
          data?.packages ||
          data?.data?.packages ||
          data?.data ||
          null;

        const finalPackages =
          returnedPackages &&
          typeof returnedPackages ===
            'object' &&
          !Array.isArray(
            returnedPackages
          )
            ? normalizePackagesResponse(
                returnedPackages
              )
            : normalizePackagesResponse(
                payload
              );

        setPackages(
          finalPackages
        );

        setTempPackages(
          deepClone(
            finalPackages
          )
        );

        setPackageSaveError(
          ''
        );

        alert(
          '✅ ዳታ ብሰላም ተዓቂቡ።'
        );

        setIsEditMode(
          false
        );

        setIsEditGateOpen(
          false
        );
      } catch (err) {
        console.error(
          'Error saving packages:',
          err
        );

        setPackageSaveError(
          err?.message ||
            'Package data could not be saved.'
        );

        alert(
          `❌ Save ኣይተዓወተን.\n\n${
            err?.message ||
            'Server error'
          }`
        );

        /*
          Save fail እንተኾይኑ
          Edit Mode ኣይንዕጾን።
        */
      } finally {
        setIsSavingPackages(
          false
        );
      }
    };

  // =========================================================
  // CANCEL MAIN EDIT MODE
  // =========================================================

  const handleCancelEdit = () => {
    setTempPackages(
      deepClone(packages)
    );

    setPackageSaveError('');

    setIsEditMode(false);
    setIsEditGateOpen(false);
  };

  // =========================================================
  // SELECT PACKAGE FOR NOTEBOOK
  // =========================================================

  const handleSelectPackageClick =
    (pkgKey) => {
      if (!isEditMode) {
        return;
      }

      const pkg =
        tempPackages?.[
          pkgKey
        ];

      if (!pkg) {
        console.error(
          'Package not found:',
          pkgKey
        );
        return;
      }

      const independentPackageCopy =
        {
          tier:
            pkg.tier || '',

          name:
            pkg.name || '',

          price:
            pkg.price || '',

          services:
            Array.isArray(
              pkg.services
            )
              ? [
                  ...pkg.services,
                ]
              : [],

          features:
            Array.isArray(
              pkg.features
            )
              ? [
                  ...pkg.features,
                ]
              : [],
        };

      setSelectedPackage(
        independentPackageCopy
      );

      setCustomerName('');
      setBookingDate('');

      setCustomizedPrice(
        independentPackageCopy.price
      );

      setEditingNoteId(
        null
      );

      setIsBookingModalOpen(
        true
      );
    };

  // =========================================================
  // NOTEBOOK MODAL HELPERS
  // =========================================================

  const updateSelectedPackageField =
    (
      field,
      value
    ) => {
      setSelectedPackage(
        (prev) => {
          if (!prev) {
            return prev;
          }

          return {
            ...prev,
            [field]:
              value,
          };
        }
      );
    };

  const updateSelectedPackageArray =
    (
      field,
      value
    ) => {
      const arrayValue =
        String(value)
          .split('\n')
          .map(
            (item) =>
              item.trim()
          )
          .filter(Boolean);

      setSelectedPackage(
        (prev) => {
          if (!prev) {
            return prev;
          }

          return {
            ...prev,
            [field]:
              arrayValue,
          };
        }
      );
    };

  // =========================================================
  // SAVE NOTEBOOK
  // =========================================================

  const handleBookingSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !customerName.trim() ||
        !bookingDate ||
        !selectedPackage
      ) {
        return;
      }

      const currentEditingId =
        editingNoteId !== null
          ? editingNoteId
          : null;

      const existingNote =
        currentEditingId !== null
          ? notebookList.find(
              (item) =>
                String(
                  getNotebookId(
                    item
                  )
                ) ===
                String(
                  currentEditingId
                )
            )
          : null;

      const bookingPayload =
        {
          customerName:
            customerName.trim(),

          bookingDate,

          packageName:
            selectedPackage.name ||
            '',

          packagePrice:
            customizedPrice ||
            '',

          tier:
            selectedPackage.tier ||
            '',

          packageServices:
            Array.isArray(
              selectedPackage.services
            )
              ? [
                  ...selectedPackage.services,
                ]
              : [],

          packageFeatures:
            Array.isArray(
              selectedPackage.features
            )
              ? [
                  ...selectedPackage.features,
                ]
              : [],

          timestamp:
            existingNote?.timestamp ||
            new Date().toLocaleString(),
        };

      try {
        // =====================================================
        // UPDATE EXISTING NOTE
        // =====================================================

        if (
          currentEditingId !==
          null
        ) {
          const response =
            await fetch(
              `${NOTEBOOK_API}/${encodeURIComponent(
                currentEditingId
              )}`,
              {
                method: 'PUT',

                headers: {
                  'Content-Type':
                    'application/json',

                  Accept:
                    'application/json',
                },

                body: JSON.stringify(
                  bookingPayload
                ),
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data?.message ||
                `Failed to update notebook: ${response.status}`
            );
          }

          const updatedNote =
            normalizeNotebook(
              data?.note ||
                data?.notebook ||
                data?.data ||
                data
            );

          if (
            !updatedNote
          ) {
            throw new Error(
              'Updated notebook response is empty.'
            );
          }

          setNotebookList(
            (prev) =>
              prev.map(
                (item) =>
                  String(
                    getNotebookId(
                      item
                    )
                  ) ===
                  String(
                    currentEditingId
                  )
                    ? updatedNote
                    : item
              )
          );

          alert(
            '✅ Notebook ብሰላም ተስተካኺሉ።'
          );
        }

        // =====================================================
        // CREATE NEW NOTE
        // =====================================================

        else {
          const response =
            await fetch(
              NOTEBOOK_API,
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json',

                  Accept:
                    'application/json',
                },

                body: JSON.stringify(
                  bookingPayload
                ),
              }
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data?.message ||
                `Failed to save notebook: ${response.status}`
            );
          }

          const savedNote =
            normalizeNotebook(
              data?.note ||
                data?.notebook ||
                data?.data ||
                data
            );

          if (
            !savedNote
          ) {
            throw new Error(
              'Saved notebook response is empty.'
            );
          }

          setNotebookList(
            (prev) => [
              savedNote,
              ...prev,
            ]
          );

          alert(
            '✅ Notebook ኣብ MongoDB ብሰላም ተዓቂቡ።'
          );
        }

        setIsBookingModalOpen(
          false
        );

        setSelectedPackage(
          null
        );

        setEditingNoteId(
          null
        );
      } catch (err) {
        console.error(
          'Notebook save error:',
          err
        );

        alert(
          `❌ Notebook ምዕቃብ ኣይተዓወተን።\n\n${
            err?.message ||
            'Server error'
          }`
        );
      }
    };

  // =========================================================
  // EDIT NOTEBOOK
  // =========================================================

  const handleEditNoteItem =
    (note) => {
      const foundKey =
        Object.keys(
          packages
        ).find(
          (key) =>
            packages[key]
              ?.name ===
            note.packageName
        );

      const pkg =
        packages[foundKey] ||
        packages.gold;

      const copy = {
        tier:
          note.tier ||
          pkg?.tier ||
          '',

        name:
          note.packageName ||
          pkg?.name ||
          '',

        price:
          note.packagePrice ||
          pkg?.price ||
          '',

        services:
          Array.isArray(
            note.packageServices
          )
            ? [
                ...note.packageServices,
              ]
            : Array.isArray(
                pkg?.services
              )
            ? [
                ...pkg.services,
              ]
            : [],

        features:
          Array.isArray(
            note.packageFeatures
          )
            ? [
                ...note.packageFeatures,
              ]
            : Array.isArray(
                pkg?.features
              )
            ? [
                ...pkg.features,
              ]
            : [],
      };

      setSelectedPackage(
        copy
      );

      setCustomerName(
        note.customerName ||
          ''
      );

      setBookingDate(
        note.bookingDate ||
          ''
      );

      setCustomizedPrice(
        note.packagePrice ||
          ''
      );

      setEditingNoteId(
        getNotebookId(
          note
        )
      );

      setIsBookingModalOpen(
        true
      );
    };

  // =========================================================
  // DELETE NOTEBOOK
  // =========================================================

  const handleDeleteNote =
    async (id) => {
      if (!id) {
        alert(
          'Notebook ID ኣይተረኽበን።'
        );
        return;
      }

      const confirmed =
        window.confirm(
          'እዚ Notebook ብርግጸኝነት ክትድምስሶ ትደሊዶ?'
        );

      if (!confirmed) {
        return;
      }

      try {
        const response =
          await fetch(
            `${NOTEBOOK_API}/${encodeURIComponent(
              id
            )}`,
            {
              method:
                'DELETE',

              headers: {
                Accept:
                  'application/json',
              },
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `Delete failed: ${response.status}`
          );
        }

        setNotebookList(
          (prev) =>
            prev.filter(
              (note) =>
                String(
                  getNotebookId(
                    note
                  )
                ) !==
                String(id)
            )
        );

        alert(
          '✅ Notebook ተደምሲሱ።'
        );
      } catch (err) {
        console.error(
          'Delete notebook error:',
          err
        );

        alert(
          `❌ Notebook ምድምሳስ ኣይተዓወተን።\n\n${
            err?.message ||
            'Server error'
          }`
        );
      }
    };

  // =========================================================
  // CLOSE NOTEBOOK MODAL
  // =========================================================

  const handleCloseBookingModal =
    () => {
      setIsBookingModalOpen(
        false
      );

      setSelectedPackage(
        null
      );

      setEditingNoteId(
        null
      );
    };

  // =========================================================
  // ESCAPE HTML
  // =========================================================

  const escapeHtml = (
    value
  ) =>
    String(value ?? '')
      .replace(
        /&/g,
        '&amp;'
      )
      .replace(
        /</g,
        '&lt;'
      )
      .replace(
        />/g,
        '&gt;'
      )
      .replace(
        /"/g,
        '&quot;'
      )
      .replace(
        /'/g,
        '&#039;'
      );

  // =========================================================
  // SHARE RECEIPT
  // =========================================================

  const handleShareReceipt =
    async (note) => {
      const servicesHtml =
        Array.isArray(
          note.packageServices
        ) &&
        note
          .packageServices
          .length
          ? note.packageServices
              .map(
                (service) =>
                  `<li>${escapeHtml(
                    service
                  )}</li>`
              )
              .join('')
          : '<li>ኣገልግሎት የለን</li>';

      const featuresHtml =
        Array.isArray(
          note.packageFeatures
        ) &&
        note
          .packageFeatures
          .length
          ? note.packageFeatures
              .map(
                (feature) =>
                  `<li>${escapeHtml(
                    feature
                  )}</li>`
              )
              .join('')
          : '<li>የለን</li>';

      const receiptHtml = `
        <div
          id="receipt-share-card"
          style="
            width:900px;
            box-sizing:border-box;
            background:#050505;
            color:#ffffff;
            padding:42px;
            font-family:Arial,'Noto Sans Ethiopic',sans-serif;
            border:4px solid #dfb557;
            border-radius:24px;
            position:relative;
            overflow:hidden;
          "
        >

          <div
            style="
              position:absolute;
              inset:14px;
              border:1px solid rgba(223,181,87,.45);
              border-radius:16px;
            "
          ></div>

          <div
            style="
              text-align:center;
              position:relative;
              z-index:1;
            "
          >
            <div
              style="
                color:#dfb557;
                font-size:18px;
                font-weight:700;
                letter-spacing:5px;
                margin-bottom:10px;
              "
            >
              HABESHA FILM PRODUCTION
            </div>

            <div
              style="
                color:#ffffff;
                font-size:28px;
                font-weight:700;
                margin-bottom:8px;
              "
            >
              BOOKING RECEIPT
            </div>

            <div
              style="
                width:90px;
                height:3px;
                background:#dfb557;
                margin:0 auto 26px;
              "
            ></div>
          </div>

          <div
            style="
              position:relative;
              z-index:1;
              border:1px solid rgba(223,181,87,.55);
              border-radius:16px;
              padding:24px;
              background:#0b0b0b;
            "
          >

            <div
              style="
                display:flex;
                justify-content:space-between;
                gap:24px;
                margin-bottom:16px;
              "
            >

              <div>
                <div
                  style="
                    color:#dfb557;
                    font-size:12px;
                    font-weight:700;
                    margin-bottom:6px;
                  "
                >
                  CUSTOMER NAME
                </div>

                <div
                  style="
                    font-size:22px;
                    font-weight:700;
                  "
                >
                  ${escapeHtml(
                    note.customerName
                  )}
                </div>
              </div>

              <div style="text-align:right;">
                <div
                  style="
                    color:#dfb557;
                    font-size:12px;
                    font-weight:700;
                    margin-bottom:6px;
                  "
                >
                  BOOKING DATE
                </div>

                <div
                  style="
                    font-size:18px;
                    font-weight:600;
                  "
                >
                  ${escapeHtml(
                    note.bookingDate
                  )}
                </div>
              </div>

            </div>

            <div
              style="
                height:1px;
                background:rgba(223,181,87,.35);
                margin:18px 0;
              "
            ></div>

            <div
              style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:20px;
              "
            >

              <div>

                <div
                  style="
                    color:#dfb557;
                    font-size:11px;
                    font-weight:700;
                    margin-bottom:6px;
                  "
                >
                  PACKAGE
                </div>

                <div
                  style="
                    font-size:25px;
                    font-weight:700;
                  "
                >
                  ${escapeHtml(
                    note.packageName
                  )}
                </div>

                <div
                  style="
                    font-size:13px;
                    color:#dfb557;
                    margin-top:5px;
                  "
                >
                  ${escapeHtml(
                    note.tier
                  )}
                </div>

              </div>

              <div
                style="
                  color:#dfb557;
                  font-size:28px;
                  font-weight:800;
                "
              >
                ${escapeHtml(
                  note.packagePrice
                )}
              </div>

            </div>

            <div
              style="
                height:1px;
                background:rgba(223,181,87,.35);
                margin:22px 0;
              "
            ></div>

            <div
              style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:28px;
              "
            >

              <div>

                <div
                  style="
                    color:#dfb557;
                    font-size:13px;
                    font-weight:700;
                    margin-bottom:10px;
                  "
                >
                  SERVICES
                </div>

                <ul
                  style="
                    margin:0;
                    padding-left:20px;
                    font-size:14px;
                    line-height:1.7;
                  "
                >
                  ${servicesHtml}
                </ul>

              </div>

              <div>

                <div
                  style="
                    color:#dfb557;
                    font-size:13px;
                    font-weight:700;
                    margin-bottom:10px;
                  "
                >
                  FEATURES
                </div>

                <ul
                  style="
                    margin:0;
                    padding-left:20px;
                    font-size:14px;
                    line-height:1.7;
                  "
                >
                  ${featuresHtml}
                </ul>

              </div>

            </div>

          </div>

          <div
            style="
              text-align:center;
              position:relative;
              z-index:1;
              margin-top:24px;
              font-size:13px;
              line-height:1.7;
            "
          >

            <div
              style="
                color:#dfb557;
                font-weight:700;
              "
            >
              HABESHA FILM PRODUCTION STUDIO
            </div>

            <div>
              ✨ መጻኢ ፕሮጀክትታትኩም ብሉጽ ብዝኾነ ኣገባብ ነሰርሕ! ✨
            </div>

          </div>

        </div>
      `;

      let container = null;

      try {
        container =
          document.createElement(
            'div'
          );

        container.style.position =
          'fixed';

        container.style.left =
          '-100000px';

        container.style.top =
          '0';

        container.style.width =
          '900px';

        container.style.zIndex =
          '-1';

        container.innerHTML =
          receiptHtml;

        document.body.appendChild(
          container
        );

        const receiptElement =
          container.querySelector(
            '#receipt-share-card'
          );

        await new Promise(
          (resolve) =>
            requestAnimationFrame(
              resolve
            )
        );

        const canvas =
          await html2canvas(
            receiptElement,
            {
              backgroundColor:
                '#050505',

              scale: 2,

              useCORS: true,

              logging: false,
            }
          );

        const blob =
          await new Promise(
            (resolve) =>
              canvas.toBlob(
                resolve,
                'image/png',
                1
              )
          );

        if (!blob) {
          throw new Error(
            'Could not create receipt image.'
          );
        }

        const file =
          new File(
            [blob],
            `Habesha-Film-Receipt-${Date.now()}.png`,
            {
              type:
                'image/png',
            }
          );

        if (
          navigator.share &&
          (!navigator.canShare ||
            navigator.canShare({
              files: [
                file,
              ],
            }))
        ) {
          await navigator.share(
            {
              title:
                'Booking Receipt - Habesha Film Production',

              text:
                'Booking Receipt - Habesha Film Production',

              files: [
                file,
              ],
            }
          );
        } else {
          const imageUrl =
            URL.createObjectURL(
              blob
            );

          const link =
            document.createElement(
              'a'
            );

          link.href =
            imageUrl;

          link.download =
            file.name;

          document.body.appendChild(
            link
          );

          link.click();

          link.remove();

          URL.revokeObjectURL(
            imageUrl
          );

          alert(
            'Receipt PNG ተዳልዩ ኣሎ።'
          );
        }
      } catch (err) {
        console.error(
          'Receipt error:',
          err
        );

        if (
          err?.name !==
          'AbortError'
        ) {
          alert(
            'Receipt ምፍጣር ኣይተዓወተን።'
          );
        }
      } finally {
        if (
          container &&
          container.parentNode
        ) {
          container.parentNode.removeChild(
            container
          );
        }
      }
    };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans overflow-x-hidden flex flex-col justify-between">

      <Navbar />

      <div className="flex-grow flex items-center justify-center px-4 py-32">

        {!isAuthenticated ? (
          /* =================================================
             LOGIN
          ================================================= */

          <div className="bg-zinc-950 p-8 md:p-12 shadow-2xl border-2 border-[#dfb557]/40 rounded-2xl max-w-md w-full text-center">

            <span className="text-[10px] tracking-[0.4em] uppercase text-[#dfb557] font-semibold block mb-2">
              Secure Access
            </span>

            <h2 className="text-2xl md:text-3xl font-serif mb-3">
              Protected Price Page
            </h2>

            <div className="w-12 h-[1px] bg-[#dfb557]/40 mx-auto mb-4" />

            <p className="text-xs md:text-sm text-zinc-400 mb-6">
              እዚ ገጽ ብሚጢራዊ ፓስኮድ ዝተዓጸወ እዩ።
            </p>

            <form
              onSubmit={
                handleLogin
              }
              className="space-y-4"
            >

              <input
                type="password"
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) =>
                  setPasscode(
                    e.target.value
                  )
                }
                className="w-full px-4 py-3 bg-zinc-900 border border-[#dfb557]/50 rounded-xl focus:outline-none focus:border-[#dfb557] text-center tracking-widest text-lg"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#dfb557] text-black py-3 uppercase text-xs font-bold tracking-[0.3em] rounded-xl disabled:opacity-50"
              >
                {loading
                  ? 'Checking...'
                  : 'Submit'}
              </button>

              {error && (
                <p className="text-red-400 text-xs">
                  ጌጋ ፓስኮድ! ደጊምካ ፈትን።
                </p>
              )}

            </form>
          </div>

        ) : isEditMode ? (

          /* =================================================
             ADMIN EDIT MODE
          ================================================= */

          <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-12 w-full">

            <div className="text-center mb-8">

              <span className="text-[10px] tracking-[0.5em] uppercase text-[#dfb557]">
                Administration Mode
              </span>

              <h1 className="text-3xl font-serif mt-2">
                Edit Packages & Admin Notebook
              </h1>

            </div>

            <div className="bg-zinc-950 border border-[#dfb557]/40 p-3 sm:p-6 md:p-8 rounded-2xl space-y-8 shadow-2xl">

              {/* =================================================
                  NOTEBOOK
              ================================================= */}

              <div className="bg-zinc-900 rounded-xl border border-[#dfb557]/30 overflow-hidden">

                <button
                  type="button"
                  onClick={() =>
                    setIsNotebookOpen(
                      (prev) =>
                        !prev
                    )
                  }
                  className="w-full flex justify-between items-center gap-4 p-4 sm:p-6 text-left hover:bg-zinc-800/60"
                >

                  <div>

                    <span className="text-xs font-bold uppercase text-[#dfb557]">
                      📝 Admin Notebook & Customer Bookings
                    </span>

                    <span className="hidden sm:block text-[10px] text-zinc-400 mt-1">
                      ዋጋ፣ ኣገልግሎትን ባህርያትን ሒዙ ይዕቀብ
                    </span>

                  </div>

                  <span
                    className={`text-[#dfb557] transition-transform ${
                      isNotebookOpen
                        ? 'rotate-180'
                        : ''
                    }`}
                  >
                    ▼
                  </span>

                </button>

                {isNotebookOpen && (
                  <div className="px-3 sm:px-6 pb-6 border-t border-zinc-800">

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pt-4">

                      {notebookList.length ===
                      0 ? (
                        <p className="text-zinc-500 text-xs italic text-center py-4">
                          ዝኾነ ዝተመዝገበ ዓሚል የልቦን።
                        </p>
                      ) : (
                        notebookList.map(
                          (note) => (
                            <div
                              key={String(
                                getNotebookId(
                                  note
                                )
                              )}
                              className="bg-zinc-950 border border-zinc-800 p-3 sm:p-5 rounded-xl space-y-4"
                            >

                              <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-zinc-900 pb-3">

                                <div className="flex items-center gap-3 flex-wrap">

                                  <span className="text-base font-serif font-bold text-[#dfb557]">
                                    {note.customerName}
                                  </span>

                                  <span className="text-[10px] bg-zinc-900 border border-zinc-700 px-2.5 py-1 rounded-md">
                                    📅 {note.bookingDate}
                                  </span>

                                </div>

                                <span className="text-[9px] text-zinc-500">
                                  {note.timestamp}
                                </span>

                              </div>

                              <div className="bg-zinc-900/80 border border-[#dfb557]/30 p-3 sm:p-4 rounded-xl space-y-4">

                                <div className="flex justify-between items-start gap-3">

                                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#dfb557]">
                                    {note.tier}
                                  </span>

                                  <span className="text-lg font-serif font-bold text-[#dfb557]">
                                    {note.packagePrice}
                                  </span>

                                </div>

                                <h4 className="text-lg sm:text-xl font-serif break-words">
                                  {note.packageName}{' '}
                                  Package
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-zinc-800">

                                  <div>
                                    <span className="text-[10px] text-[#dfb557] font-semibold uppercase block mb-2">
                                      SERVICES
                                    </span>

                                    <ul className="space-y-1 text-xs text-zinc-300">

                                      {note.packageServices.length >
                                      0 ? (
                                        note.packageServices.map(
                                          (
                                            item,
                                            index
                                          ) => (
                                            <li
                                              key={
                                                index
                                              }
                                            >
                                              {
                                                item
                                              }
                                            </li>
                                          )
                                        )
                                      ) : (
                                        <li className="text-zinc-500">
                                          የለን
                                        </li>
                                      )}

                                    </ul>
                                  </div>

                                  <div>
                                    <span className="text-[10px] text-[#dfb557] font-semibold uppercase block mb-2">
                                      FEATURES
                                    </span>

                                    <ul className="space-y-1 text-xs text-zinc-300">

                                      {note.packageFeatures.length >
                                      0 ? (
                                        note.packageFeatures.map(
                                          (
                                            item,
                                            index
                                          ) => (
                                            <li
                                              key={
                                                index
                                              }
                                            >
                                              {
                                                item
                                              }
                                            </li>
                                          )
                                        )
                                      ) : (
                                        <li className="text-zinc-500">
                                          የለን
                                        </li>
                                      )}

                                    </ul>
                                  </div>

                                </div>

                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleShareReceipt(
                                      note
                                    )
                                  }
                                  className="px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[10px] uppercase font-semibold"
                                >
                                  Share 🔗
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEditNoteItem(
                                      note
                                    )
                                  }
                                  className="px-3 py-2.5 bg-[#dfb557]/20 hover:bg-[#dfb557]/40 text-[#dfb557] rounded-lg text-[10px] uppercase font-semibold"
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteNote(
                                      getNotebookId(
                                        note
                                      )
                                    )
                                  }
                                  className="px-3 py-2.5 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-lg text-[10px] uppercase font-semibold"
                                >
                                  Delete
                                </button>

                              </div>

                            </div>
                          )
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>

              {/* =================================================
                  WEBSITE PACKAGES
              ================================================= */}

              <div>

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-sm font-bold uppercase text-[#dfb557] tracking-wider">
                    ⚙️ Edit Website Packages
                  </h3>

                  <span className="lg:hidden text-[9px] text-zinc-500">
                    ← Swipe →
                  </span>

                </div>

                <div className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-x-visible pb-4">

                  {Object.keys(
                    tempPackages
                  ).map((key) => {
                    const pkg =
                      tempPackages[
                        key
                      ];

                    return (
                      <div
                        key={key}
                        className="flex-none w-[86vw] sm:w-[68vw] md:w-[48vw] lg:w-auto bg-zinc-900 border-2 border-[#dfb557]/40 p-4 sm:p-6 rounded-2xl shadow-xl space-y-4"
                      >

                        <div className="space-y-3">

                          <div>
                            <label className="text-[9px] uppercase text-zinc-400 font-semibold block mb-1">
                              Tier Title
                            </label>

                            <input
                              value={
                                pkg.tier ||
                                ''
                              }
                              onChange={(
                                e
                              ) =>
                                updateTempPackageField(
                                  key,
                                  'tier',
                                  e.target.value
                                )
                              }
                              className="w-full bg-zinc-950 border border-zinc-700 p-2 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] uppercase text-zinc-400 font-semibold block mb-1">
                              Package Name
                            </label>

                            <input
                              value={
                                pkg.name ||
                                ''
                              }
                              onChange={(
                                e
                              ) =>
                                updateTempPackageField(
                                  key,
                                  'name',
                                  e.target.value
                                )
                              }
                              className="w-full bg-zinc-950 border border-zinc-700 p-2 rounded-lg text-xs font-serif font-bold text-lg"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] uppercase text-zinc-400 font-semibold block mb-1">
                              Price
                            </label>

                            <input
                              value={
                                pkg.price ||
                                ''
                              }
                              onChange={(
                                e
                              ) =>
                                updateTempPackageField(
                                  key,
                                  'price',
                                  e.target.value
                                )
                              }
                              className="w-full bg-zinc-950 border border-zinc-700 p-2 rounded-lg text-xs text-[#dfb557] font-bold"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] uppercase text-zinc-400 font-semibold block mb-1">
                              Services
                            </label>

                            <textarea
                              rows={5}
                              value={(
                                pkg.services ||
                                []
                              ).join('\n')}
                              onChange={(
                                e
                              ) =>
                                updateTempPackageArray(
                                  key,
                                  'services',
                                  e.target.value
                                )
                              }
                              className="w-full bg-zinc-950 border border-zinc-700 p-2 rounded-lg text-[11px]"
                            />
                          </div>

                          <div>
                            <label className="text-[9px] uppercase text-zinc-400 font-semibold block mb-1">
                              Features
                            </label>

                            <textarea
                              rows={6}
                              value={(
                                pkg.features ||
                                []
                              ).join('\n')}
                              onChange={(
                                e
                              ) =>
                                updateTempPackageArray(
                                  key,
                                  'features',
                                  e.target.value
                                )
                              }
                              className="w-full bg-zinc-950 border border-zinc-700 p-2 rounded-lg text-[11px]"
                            />
                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleSelectPackageClick(
                              key
                            )
                          }
                          className="w-full bg-[#dfb557] text-black py-2.5 rounded-xl text-[10px] uppercase font-bold"
                        >
                          Select{' '}
                          {pkg.name}{' '}
                          ➔
                        </button>

                      </div>
                    );
                  })}

                </div>
              </div>

              {packageSaveError && (
                <div className="bg-red-950/40 border border-red-500/40 text-red-300 p-3 rounded-xl text-xs">
                  {packageSaveError}
                </div>
              )}

              {/* =================================================
                  SAVE / CANCEL
              ================================================= */}

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-zinc-900">

                <button
                  type="button"
                  onClick={
                    handleCancelEdit
                  }
                  disabled={
                    isSavingPackages
                  }
                  className="w-full sm:w-auto px-6 py-3 bg-zinc-900 text-zinc-300 rounded-xl text-xs uppercase font-bold disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    handleSaveAndExit
                  }
                  disabled={
                    isSavingPackages
                  }
                  className="w-full sm:w-auto px-6 py-3 bg-[#dfb557] text-black rounded-xl text-xs uppercase font-bold disabled:opacity-50"
                >
                  {isSavingPackages
                    ? 'Saving...'
                    : 'Save Changes'}
                </button>

              </div>

            </div>
          </div>

        ) : (

          /* =================================================
             CUSTOMER VIEW
          ================================================= */

          <div className="max-w-7xl mx-auto text-center px-2 sm:px-4 py-6 sm:py-12 w-full">

            <div className="flex justify-end mb-4">

              {!isEditGateOpen ? (

                <div className="flex flex-col items-end">

                  <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-[#dfb557]/40">

                    <input
                      type="password"
                      placeholder="Admin Code"
                      value={
                        adminPasscode
                      }
                      onChange={(
                        e
                      ) =>
                        setAdminPasscode(
                          e.target.value
                        )
                      }
                      className="bg-transparent text-zinc-100 text-xs px-2 focus:outline-none w-28"
                    />

                    <button
                      type="button"
                      onClick={
                        handleEditGateSubmit
                      }
                      className="px-3 py-1.5 bg-[#dfb557] text-black rounded-lg text-[10px] font-bold uppercase"
                    >
                      Unlock
                    </button>

                  </div>

                  {adminError && (
                    <p className="text-red-400 text-[10px] mt-1">
                      Wrong Admin Code!
                    </p>
                  )}

                </div>

              ) : (

                <button
                  type="button"
                  onClick={() =>
                    setIsEditMode(
                      true
                    )
                  }
                  className="px-4 py-2 bg-[#dfb557] text-black rounded-xl text-xs uppercase font-semibold"
                >
                  Enter Edit Mode ⚙️
                </button>

              )}

            </div>

            <span className="text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-[#dfb557] block mb-2">
              Investment & Tiers
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">
              Our Professional Packages
            </h1>

            <div className="w-12 h-[1px] bg-[#dfb557]/40 mx-auto mb-4" />

            <p className="text-zinc-400 text-sm md:text-base mb-16 max-w-2xl mx-auto">
              ንመጻኢ ፕሮጀክትታትኩም ዝኸውን ዝተፈላለየ ሞያዊ ኣገልግሎታት።
            </p>

            <div className="flex lg:grid lg:grid-cols-4 gap-5 lg:gap-6 text-left overflow-x-auto lg:overflow-x-visible pb-5">

              {Object.keys(
                packages
              ).map((key) => {
                const pkg =
                  packages[key];

                return (
                  <div
                    key={key}
                    className={`flex-none w-[82vw] sm:w-[65vw] md:w-[45vw] lg:w-auto bg-zinc-950/90 border-2 ${
                      key === 'gold'
                        ? 'border-[#dfb557]'
                        : 'border-[#dfb557]/50'
                    } p-6 sm:p-8 rounded-2xl shadow-2xl relative`}
                  >

                    {key === 'gold' && (
                      <span className="absolute -top-3 right-6 bg-[#dfb557] text-black text-[9px] uppercase font-bold px-3 py-1 rounded-full">
                        {pkg.tier}
                      </span>
                    )}

                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#dfb557]">
                      {key === 'gold'
                        ? 'Exclusive'
                        : pkg.tier}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-serif mt-1 mb-2 break-words">
                      {pkg.name}
                    </h3>

                    <p className="text-2xl sm:text-3xl font-serif font-bold text-[#dfb557] mb-6 break-words">
                      {pkg.price}
                    </p>

                    {pkg.services?.length >
                      0 && (
                      <div className="text-xs sm:text-sm text-zinc-300 space-y-2 mb-4 border-b border-zinc-900 pb-4">

                        {pkg.services.map(
                          (
                            service,
                            index
                          ) => (
                            <p
                              key={
                                index
                              }
                            >
                              {service}
                            </p>
                          )
                        )}

                      </div>
                    )}

                    <ul className="text-xs sm:text-sm text-zinc-300 space-y-3">

                      {(
                        pkg.features ||
                        []
                      ).map(
                        (
                          feature,
                          index
                        ) => (
                          <li
                            key={
                              index
                            }
                          >
                            {feature}
                          </li>
                        )
                      )}

                    </ul>

                  </div>
                );
              })}

            </div>

          </div>

        )}

      </div>

      {/* =======================================================
          NOTEBOOK MODAL
      ======================================================= */}

      {isBookingModalOpen &&
        selectedPackage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">

            <div className="bg-zinc-950 border border-[#dfb557]/40 p-4 sm:p-6 md:p-8 rounded-2xl max-w-5xl w-full max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)] overflow-y-auto shadow-2xl">

              <div className="flex justify-between items-start gap-3 border-b border-zinc-900 pb-3 mb-5">

                <div>

                  <h3 className="text-base sm:text-lg font-serif text-[#dfb557]">

                    {editingNoteId !==
                    null
                      ? '✏️ Edit Admin Notebook'
                      : 'ዝርዝር መረጻ ንዓሚል ምዝገባ'}

                  </h3>

                  <span className="text-[10px] text-zinc-500">

                    {editingNoteId !==
                    null
                      ? 'ናይዚ Notebook ጥራሕ እዩ ዝቕየር'
                      : 'Selected package is an independent copy'}

                  </span>

                </div>

                <button
                  type="button"
                  onClick={
                    handleCloseBookingModal
                  }
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>

              </div>

              <form
                onSubmit={
                  handleBookingSubmit
                }
                className="space-y-5"
              >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label className="text-[10px] uppercase text-zinc-400 block mb-1">
                      ስም ዓሚል
                    </label>

                    <input
                      required
                      type="text"
                      value={
                        customerName
                      }
                      onChange={(
                        e
                      ) =>
                        setCustomerName(
                          e.target.value
                        )
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl text-xs focus:outline-none focus:border-[#dfb557]"
                    />

                  </div>

                  <div>

                    <label className="text-[10px] uppercase text-zinc-400 block mb-1">
                      ዕለት መደብ
                    </label>

                    <input
                      required
                      type="date"
                      value={
                        bookingDate
                      }
                      onChange={(
                        e
                      ) =>
                        setBookingDate(
                          e.target.value
                        )
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl text-xs focus:outline-none focus:border-[#dfb557]"
                    />

                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label className="text-[10px] uppercase text-zinc-400 block mb-1">
                      Package Name
                    </label>

                    <input
                      type="text"
                      value={
                        selectedPackage.name ||
                        ''
                      }
                      onChange={(
                        e
                      ) =>
                        updateSelectedPackageField(
                          'name',
                          e.target.value
                        )
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl text-xs"
                    />

                  </div>

                  <div>

                    <label className="text-[10px] uppercase text-zinc-400 block mb-1">
                      Tier
                    </label>

                    <input
                      type="text"
                      value={
                        selectedPackage.tier ||
                        ''
                      }
                      onChange={(
                        e
                      ) =>
                        updateSelectedPackageField(
                          'tier',
                          e.target.value
                        )
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl text-xs"
                    />

                  </div>

                </div>

                <div>

                  <label className="text-[10px] uppercase text-zinc-400 block mb-1">
                    ዋጋ
                  </label>

                  <input
                    required
                    type="text"
                    value={
                      customizedPrice
                    }
                    onChange={(
                      e
                    ) => {
                      setCustomizedPrice(
                        e.target.value
                      );

                      updateSelectedPackageField(
                        'price',
                        e.target.value
                      );
                    }}
                    className="w-full bg-zinc-900 border border-zinc-700 p-3 rounded-xl text-xs text-[#dfb557] font-bold"
                  />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="bg-zinc-900 border border-[#dfb557]/30 rounded-xl p-4">

                    <h4 className="text-[10px] uppercase font-bold text-[#dfb557] mb-3">
                      SERVICES
                    </h4>

                    <textarea
                      rows={12}
                      value={(
                        selectedPackage.services ||
                        []
                      ).join('\n')}
                      onChange={(
                        e
                      ) =>
                        updateSelectedPackageArray(
                          'services',
                          e.target.value
                        )
                      }
                      className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded-xl text-xs"
                    />

                  </div>

                  <div className="bg-zinc-900 border border-[#dfb557]/30 rounded-xl p-4">

                    <h4 className="text-[10px] uppercase font-bold text-[#dfb557] mb-3">
                      FEATURES
                    </h4>

                    <textarea
                      rows={12}
                      value={(
                        selectedPackage.features ||
                        []
                      ).join('\n')}
                      onChange={(
                        e
                      ) =>
                        updateSelectedPackageArray(
                          'features',
                          e.target.value
                        )
                      }
                      className="w-full bg-zinc-950 border border-zinc-700 p-3 rounded-xl text-xs"
                    />

                  </div>

                </div>

                <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">

                  <h4 className="text-[10px] uppercase font-bold text-[#dfb557] mb-4">
                    Notebook Preview
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>

                      <span className="text-[9px] text-zinc-500 uppercase">
                        Customer
                      </span>

                      <p className="text-sm font-semibold">
                        {customerName ||
                          '—'}
                      </p>

                    </div>

                    <div>

                      <span className="text-[9px] text-zinc-500 uppercase">
                        Date
                      </span>

                      <p className="text-sm">
                        {bookingDate ||
                          '—'}
                      </p>

                    </div>

                    <div>

                      <span className="text-[9px] text-zinc-500 uppercase">
                        Package
                      </span>

                      <p className="text-sm font-semibold">
                        {selectedPackage.name ||
                          '—'}
                      </p>

                    </div>

                    <div>

                      <span className="text-[9px] text-zinc-500 uppercase">
                        Price
                      </span>

                      <p className="text-sm text-[#dfb557] font-bold">
                        {customizedPrice ||
                          '—'}
                      </p>

                    </div>

                  </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-zinc-900">

                  <button
                    type="button"
                    onClick={
                      handleCloseBookingModal
                    }
                    className="w-full sm:w-1/2 bg-zinc-900 text-zinc-300 py-3 rounded-xl text-xs uppercase font-bold"
                  >
                    ሰርዝ
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-1/2 bg-[#dfb557] text-black py-3 rounded-xl text-xs uppercase font-bold"
                  >
                    {editingNoteId !==
                    null
                      ? 'Update / Save'
                      : 'ኣቐመጥ (Save)'}
                  </button>

                </div>

              </form>

            </div>
          </div>
        )}

      <Footer />
    </div>
  );
}

export default Price;