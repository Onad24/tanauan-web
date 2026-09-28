#!/bin/bash
# Download all 25 department folders from Google Drive
cd /home/krixan/Documents/tanauan/tanauan-leyte-clone/migration/drive_data
set -e

declare -A FOLDERS
FOLDERS["BAC"]="1Q0i4baCN2gBcVrRAAKBoCqFyE6YAf_Oh"
FOLDERS["BPLO"]="1X1PqvcKsqlPjWqkQD0GFQr79KhpAK5z4"
FOLDERS["GSO"]="1JZkBHNwd_VKc-8LJxDtpR_a9O9OFgffY"
FOLDERS["HRMO"]="1V8LYbcF-QyVAtYpHczTtVnPz9LvcYMph"
FOLDERS["IT"]="1wMueihYjNiuSNwtnsi6_Xh2qqzCwc4KK"
FOLDERS["MACCO"]="1LxUUIzbvOdxpCT2U43CZWW5xxyZeOJuk"
FOLDERS["MAO"]="1Y9-2nyUmdmWWfwAc64g77vEoci1aN_bx"
FOLDERS["MARKET"]="1Ew_mx9y1i49QxdGgw8lBdtQhsw6K6ugc"
FOLDERS["MASSO"]="1WORjWJ5F8ISRVa1tFM4UBlGmwnySL9f0"
FOLDERS["MBO"]="154wTf8Y9C6ObJH3AeAsQ5gzP3hVrb1fi"
FOLDERS["MCR"]="1yrcY9mdPWdSuqx6ueEtRMvHy_ipVjMCy"
FOLDERS["MDRRMO"]="1ua1w60-Rxm8-Iiw9wKwuoTyusWSa3CpQ"
FOLDERS["MENRO"]="1wvzwVazCQZN3RKJT5KVN5Mi4FzgSlsun"
FOLDERS["MEO"]="1EhgMwYZS4qjb7s4tj_RV1AMhKk2HCQz_"
FOLDERS["MHO"]="1BTOChIg0eU0OaW6i334-r2_sIWdL1IYu"
FOLDERS["MPCO"]="17eqf_iGBuiBgAsq9BfnhrmcH4tRouW7A"
FOLDERS["MPDO"]="1Il3ZkZuMC7s4VkxIwFBsN4CvD2TGw_wh"
FOLDERS["MSWDO"]="1d_rJBikxkiGemoZK7x20Hzmt1VTJbOBY"
FOLDERS["MTO"]="1D9tiJp_4xhBjOBdqvP-CzCYms_vMqukz"
FOLDERS["PESO"]="1Q1oHAc3Y5UfB7Siz9UL65NDiXKIiF28H"
FOLDERS["PROCUREMENT"]="10iQ4Avg1lSElvCAWzn98--zUUBIrJE88"
FOLDERS["SB"]="1GRaoDax9wGYLKed2iCyvZfu8qJHN1PKe"
FOLDERS["SLAUGHTERHOUSE"]="1BK64lBtu_1uvee7_Gtx4rOdwvbvYYyHZ"
FOLDERS["TOURISM"]="1U_iGKLI563E4T16eQIPtBgb0xHCcaXi4"
FOLDERS["VICE_MAYOR"]="1sRrD9RgNk6RjzgyI0ir3_gIeKbBWoOQ1"

for name in "${!FOLDERS[@]}"; do
    id="${FOLDERS[$name]}"
    if [ -d "$name" ] && [ -n "$(ls -A "$name" 2>/dev/null)" ]; then
        echo "SKIP $name (already exists)"
        continue
    fi
    echo "=== DOWNLOADING $name ==="
    ~/.venvs/logicox/bin/python -c "from pathlib import Path; import sys; sys.path.insert(0,'/tmp/drivetools/lib/python3.11/site-packages')" 2>/dev/null || true
    gdown --folder "https://drive.google.com/drive/folders/$id" -O "$name" --no-check-certificate 2>&1 | tail -3 || echo "$name FAILED"
    echo "--- $name done ---"
done
echo "ALL DOWNLOADS COMPLETE"