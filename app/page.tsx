"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const MERCHANT_WALLET = "F7RAVkx83JApfEjAuxwypPfntoawVEP1LF8QJqTnVDmC";

// Demo pricing
const USD_TO_SOL_RATE = 258.53; // Approx based on your example: 0.32 SOL = $82.73
const SUBTOTAL_USD = 69.0;
const SHIPPING_USD = 6.99;
const TAX_USD = 6.74;
const TOTAL_USD = 82.73;
const TOTAL_SOL = 0.32;

const PRODUCTS = [
  {
    id: 1,
    name: "Crop Hoodie and Sweatpants Set",
    variant: "Gold / Size M",
    priceUsd: 46.0,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Cropped Denim Jeans",
    variant: "Light Wash / Size 26",
    priceUsd: 23.0,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [signature, setSignature] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const merchantPublicKey = useMemo(() => {
    try {
      return new PublicKey(MERCHANT_WALLET);
    } catch {
      return null;
    }
  }, []);

  const handlePay = async () => {
    if (!publicKey) {
      setStatus("Please connect your wallet first.");
      return;
    }

    if (!merchantPublicKey) {
      setStatus("Merchant wallet address is invalid.");
      return;
    }

    try {
      setIsPaying(true);
      setSignature(null);
      setStatus("Creating Solana checkout transaction...");

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: merchantPublicKey,
          lamports: TOTAL_SOL * LAMPORTS_PER_SOL,
        })
      );

      setStatus("Waiting for wallet approval...");
      const txSig = await sendTransaction(transaction, connection);

      setStatus("Confirming payment on Solana Devnet...");
      await connection.confirmTransaction(txSig, "confirmed");

      setSignature(txSig);
      setStatus(
        "Payment successful. Lilly’s Boutique has received the order payment."
      );
    } catch (error) {
      console.error(error);
      setStatus("Payment failed. Please review the console for details.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #fdf8f5 0%, #f7f4ef 45%, #f5f2ec 100%)",
        color: "#1f2937",
        padding: "32px 20px 48px",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, #111827 0%, #7c3aed 55%, #ec4899 100%)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "22px",
                boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
              }}
            >
              LB
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                  lineHeight: 1.1,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                Lilly’s Boutique
              </h1>
              <p style={{ margin: "6px 0 0 0", color: "#6b7280" }}>
                Boutique apparel checkout prototype with Solana payment
              </p>
            </div>
          </div>

          <WalletMultiButton />
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.45fr 1fr",
            gap: "24px",
          }}
        >
          <section
            style={{
              background: "rgba(255,255,255,0.92)",
              borderRadius: "24px",
              padding: "26px",
              boxShadow: "0 18px 50px rgba(17, 24, 39, 0.08)",
              border: "1px solid rgba(255,255,255,0.65)",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "24px",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                }}
              >
                Checkout
              </h2>
              <p style={{ margin: 0, color: "#6b7280" }}>
                April Summers is checking out with a Solana wallet on Devnet.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
                marginBottom: "24px",
              }}
            >
              <AddressCard
                title="Bill To"
                name="April Summers"
                lines={[
                  "4812 Willow Creek Lane",
                  "Frisco, TX 75034",
                  "United States",
                ]}
              />
              <AddressCard
                title="Ship To"
                name="April Summers"
                lines={[
                  "4812 Willow Creek Lane",
                  "Frisco, TX 75034",
                  "United States",
                ]}
              />
            </div>

            <div>
              <h3
                style={{
                  margin: "0 0 14px 0",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                Items in Order
              </h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "116px 1fr auto",
                      gap: "16px",
                      background: "#fff",
                      borderRadius: "18px",
                      padding: "14px",
                      border: "1px solid #ece7df",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "116px",
                        height: "132px",
                        borderRadius: "14px",
                        overflow: "hidden",
                        background: "#f3f4f6",
                      }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="116px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: "0 0 8px 0",
                          fontSize: "18px",
                          fontWeight: 700,
                        }}
                      >
                        {product.name}
                      </p>
                      <p style={{ margin: "0 0 10px 0", color: "#6b7280" }}>
                        {product.variant}
                      </p>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 10px",
                          borderRadius: "999px",
                          background: "#fdf2f8",
                          color: "#be185d",
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        Boutique Favorite
                      </span>
                    </div>

                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${product.priceUsd.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside
            style={{
              background: "rgba(255,255,255,0.95)",
              borderRadius: "24px",
              padding: "26px",
              boxShadow: "0 18px 50px rgba(17, 24, 39, 0.08)",
              border: "1px solid rgba(255,255,255,0.65)",
              alignSelf: "start",
              position: "sticky",
              top: "20px",
            }}
          >
            <h2
              style={{
                margin: "0 0 18px 0",
                fontSize: "24px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              Order Summary
            </h2>

            <div
              style={{
                borderBottom: "1px solid #ece7df",
                paddingBottom: "16px",
                marginBottom: "16px",
              }}
            >
              <Row label="Merchandise" value={`$${SUBTOTAL_USD.toFixed(2)}`} />
              <Row label="Shipping" value={`$${SHIPPING_USD.toFixed(2)}`} />
              <Row label="Sales Tax" value={`$${TAX_USD.toFixed(2)}`} />
            </div>

            <Row
              label="Total"
              value={`$${TOTAL_USD.toFixed(2)}`}
              bold
              large
            />

            <div
              style={{
                marginTop: "18px",
                borderRadius: "18px",
                padding: "18px",
                background:
                  "linear-gradient(135deg, rgba(17,24,39,1) 0%, rgba(88,28,135,1) 52%, rgba(190,24,93,1) 100%)",
                color: "#fff",
              }}
            >
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  opacity: 0.8,
                }}
              >
                Payment Rail
              </p>
              <p style={{ margin: "0 0 10px 0", fontSize: "20px", fontWeight: 800 }}>
                Pay with Solana
              </p>
              <p style={{ margin: "0 0 12px 0", opacity: 0.92 }}>
                Shopper sees USD pricing and chooses to settle the order using a
                connected Solana wallet.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "8px",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  padding: "12px 14px",
                }}
              >
                <span style={{ opacity: 0.9 }}>Approx. crypto amount</span>
                <strong style={{ fontSize: "20px" }}>{TOTAL_SOL.toFixed(2)} SOL</strong>
              </div>

              <p style={{ margin: "10px 0 0 0", fontSize: "12px", opacity: 0.78 }}>
                Demo conversion rate used for illustration: 1 SOL ≈ $
                {USD_TO_SOL_RATE.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handlePay}
              disabled={isPaying}
              style={{
                width: "100%",
                marginTop: "18px",
                padding: "15px 18px",
                borderRadius: "16px",
                border: "none",
                background: isPaying ? "#9ca3af" : "#111827",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "16px",
                cursor: isPaying ? "not-allowed" : "pointer",
                boxShadow: isPaying
                  ? "none"
                  : "0 12px 24px rgba(17, 24, 39, 0.18)",
              }}
            >
              {isPaying ? "Processing Payment..." : "Pay $82.73 with Solana"}
            </button>

            {!publicKey && (
              <div
                style={{
                  marginTop: "14px",
                  padding: "14px",
                  borderRadius: "14px",
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  color: "#9a3412",
                }}
              >
                Connect your wallet to continue checkout.
              </div>
            )}

            {publicKey && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "14px",
                  borderRadius: "14px",
                  background: "#ecfeff",
                  border: "1px solid #a5f3fc",
                }}
              >
                <p style={{ margin: "0 0 8px 0", fontWeight: 700 }}>
                  Connected Shopper Wallet
                </p>
                <p
                  style={{
                    margin: 0,
                    wordBreak: "break-all",
                    fontSize: "13px",
                    color: "#155e75",
                  }}
                >
                  {publicKey.toBase58()}
                </p>
              </div>
            )}

            {status && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "14px",
                  borderRadius: "14px",
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>Status:</strong> {status}
                </p>
              </div>
            )}

            {signature && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "14px",
                  borderRadius: "14px",
                  background: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                }}
              >
                <p style={{ margin: "0 0 8px 0", fontWeight: 700 }}>
                  Transaction Signature
                </p>
                <p
                  style={{
                    margin: "0 0 10px 0",
                    wordBreak: "break-all",
                    fontSize: "13px",
                    color: "#166534",
                  }}
                >
                  {signature}
                </p>
                <a
                  href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#166534",
                    fontWeight: 700,
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                >
                  View in Solana Explorer
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

function AddressCard({
  title,
  name,
  lines,
}: {
  title: string;
  name: string;
  lines: string[];
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "18px",
        border: "1px solid #ece7df",
      }}
    >
      <p
        style={{
          margin: "0 0 8px 0",
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#6b7280",
          fontWeight: 700,
        }}
      >
        {title}
      </p>
      <p style={{ margin: "0 0 8px 0", fontWeight: 700 }}>{name}</p>
      {lines.map((line) => (
        <p key={line} style={{ margin: "0 0 4px 0", color: "#374151" }}>
          {line}
        </p>
      ))}
    </div>
  );
}

function Row({
  label,
  value,
  bold = false,
  large = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
  large?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
        fontWeight: bold ? 800 : 500,
        fontSize: large ? "24px" : "15px",
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}