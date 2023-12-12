<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [""]
}
</script>

<style>
.modal-content {
    background-color: rgb(233, 235, 142) !important;
}

.modal {
    --bs-modal-header-border-color: none !important;
    --bs-modal-footer-border-color: none !important;
    --bs-modal-inner-border-radius: 0 !important;
    --bs-modal-border-radius: 0 !important;
    --bs-modal-border-color: none !important;
}
</style>